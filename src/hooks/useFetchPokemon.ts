import { useState, useEffect, useTransition } from 'react';
import { fetchPokemon, fetchUnknown } from '@/api/pokemon';
import {
  PokemonDetails,
  PokemonSpecies,
  EvolutionChain,
  SelectedPokemon,
} from '@/utils/interface/pokemon';
import { useNavigate } from 'react-router';

const usePokemon = (id: number) => {
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getCurrentPokemon = async (pokemonID: number) => {
      startTransition(async () => {
        try {
          const pokeDetailsData: PokemonDetails = await fetchPokemon(pokemonID);
          const speciesData: PokemonSpecies = await fetchUnknown(pokeDetailsData.species.url);
          const evolutionData: EvolutionChain = await fetchUnknown(speciesData.evolution_chain.url);
          setSelectedPokemon({
            details: pokeDetailsData,
            text:
              speciesData.flavor_text_entries.find((x) => x.language.name === 'en')?.flavor_text ||
              'No description available.',
            evolution: evolutionData,
          });
        } catch (err) {
          setError('Failed to load Pokémon details.');
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

  return { selectedPokemon, isPending, error };
};

export const navigateToPokemon = (url: string, navigate: ReturnType<typeof useNavigate>) => {
  let id = Number(url.split('/')[6]);
  navigate(`/${id}`);
};

export default usePokemon;
