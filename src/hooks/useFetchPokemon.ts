import { useState, useEffect, startTransition } from 'react';
import { fetchPokemon } from '@/services/api';
import {
  PokemonDetails,
  PokemonSpecies,
  EvolutionChain,
  SelectedPokemon,
} from '@/utils/interface/pokemon';
import { useNavigate } from 'react-router';

const usePokemon = (id: number) => {
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentPokemon = async (pokemonID: number) => {
      setLoading(true);
      setError(null);
      startTransition(async () => {
        try {
          const pokeDetails: PokemonDetails = await fetchPokemon(pokemonID);
          const speciesResponse = await fetch(pokeDetails.species.url);
          const speciesData: PokemonSpecies = await speciesResponse.json();
          const evolutionResponse = await fetch(speciesData.evolution_chain.url);
          const evolutionData: EvolutionChain = await evolutionResponse.json();

          setSelectedPokemon({
            details: pokeDetails,
            text:
              speciesData.flavor_text_entries.find((x) => x.language.name === 'en')?.flavor_text ||
              'No description available.',
            evolution: evolutionData,
          });
        } catch (err) {
          console.error('Error fetching Pokémon details:', err);
          setError('Failed to load Pokémon details.');
        } finally {
          setLoading(false);
        }
      });
    };
    if (id) {
      const screenWidth = window.innerWidth;
      if (screenWidth > 1024) document.body.style.overflow = 'auto';
      else document.body.style.overflow = 'hidden';
      getCurrentPokemon(id);
    }
  }, [id]);

  return { selectedPokemon, loading, error };
};

export const navigateToPokemon = (url: string, navigate: ReturnType<typeof useNavigate>) => {
  let id = Number(url.split('/')[6]);
  navigate(`/${id}`);
};

export default usePokemon;
