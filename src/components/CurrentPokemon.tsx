import { POKEMON_IMG_PATH } from '@/config';
import { fetchPokemon } from '@/services/api';
import {
  EvolutionChain,
  PokemonDetails,
  PokemonSpecies,
  SelectedPokemon,
} from '@/utils/interface/pokemon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const CurrentPokemon = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon | null>(null);

  useEffect(() => {
    if (id) {
      getCurrentPokemon(Number(id));
    }
  }, [id]);

  const convertToPokemonID = (url: string) => {
    const id = url.split('/')[6];
    return Number(id);
  };

  const getCurrentPokemon = async (pokemonID: number) => {
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
    }
  };
  return (
    <div className="fixed w-[300px] h-full  bg-(--card-color) shadow-lg rounded-3xl">
      {selectedPokemon && (
        <div className="p-6  text-center  grid gap-4">
          <div className="relative h-20">
            <img
              className="absolute inset-x-0  mx-auto w-[130px] bottom-0"
              src={
                selectedPokemon.details.sprites.versions['generation-v']['black-white'].animated
                  .front_default
              }
              alt={selectedPokemon.details.name}
            />
          </div>
          <p>N0{selectedPokemon.details.id}</p>
          <p>{selectedPokemon.details.name}</p>
          <p>{selectedPokemon.details.types.map((x) => x.type.name + ' ')}</p>
          <p>Pokedex Entry</p>
          <p>{selectedPokemon.text}</p>
          <h1>Height</h1>
          <p>{selectedPokemon.details.height}</p>
          <h1>Weight</h1>
          <p>{selectedPokemon.details.weight}</p>
          <h1>Abilities</h1>
          <p>{selectedPokemon.details.abilities.map((x) => x.ability.name + ' ')}</p>
          <h1>Stats</h1>
          <p>{selectedPokemon.details.stats.map((x) => x.base_stat + ' ')}</p>
          <h1>Evolution</h1>
          <p>
            <img
              onClick={() =>
                getCurrentPokemon(convertToPokemonID(selectedPokemon.evolution.chain.species.url))
              }
              src={`${POKEMON_IMG_PATH}${selectedPokemon.evolution.chain.species.url.split('/')[6]}.png`}
              alt=""
            />
            {selectedPokemon.evolution.chain.evolves_to.length > 0 ? (
              selectedPokemon.evolution.chain.evolves_to.map(
                (evolution: EvolutionChain, index: number) => (
                  <span key={index}>
                    {
                      <>
                        <span>{'Lv.' + (evolution.evolution_details[0]?.min_level ?? '?')}</span>
                      </>
                    }
                    <img
                      onClick={() => getCurrentPokemon(convertToPokemonID(evolution.species.url))}
                      src={`${POKEMON_IMG_PATH}${evolution.species.url.split('/')[6]}.png`}
                      alt=""
                    />
                    {evolution.evolves_to && evolution.evolves_to.length > 0 && (
                      <>
                        {evolution.evolves_to.map((evo: EvolutionChain, i: number) => (
                          <span key={i}>
                            <span> {'Lv.' + (evo.evolution_details[0].min_level ?? '?')}</span>
                            <img
                              onClick={() => getCurrentPokemon(convertToPokemonID(evo.species.url))}
                              src={`${POKEMON_IMG_PATH}${evo.species.url.split('/')[6]}.png`}
                              alt=""
                            />
                          </span>
                        ))}
                      </>
                    )}
                  </span>
                ),
              )
            ) : (
              <span>No evolutions available.</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentPokemon;
