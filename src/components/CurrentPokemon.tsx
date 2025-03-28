import { POKEMON_IMG_PATH, POKEMON_STATS, POKEMON_TYPES } from '@/config';
import { fetchPokemon } from '@/services/api';
import {
  EvolutionChain,
  PokemonDetails,
  PokemonSpecies,
  SelectedPokemon,
} from '@/utils/interface/pokemon';
import { useEffect, useState, startTransition } from 'react';
import { useParams } from 'react-router';
import notFoundPokemon from '@/assets/notFoundPokemon.png';

const CurrentPokemon = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getCurrentPokemon(Number(id));
    }
  }, [id]);

  const convertToPokemonID = (url: string) => Number(url.split('/')[6]);

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

  return (
    <div className="fixed w-[300px] h-full bg-(--card-color) shadow-lg rounded-3xl hidden lg:block">
      {loading ? (
        <div className="flex items-center justify-center  h-full">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-(--card-description-color)">{error}</p>
        </div>
      ) : selectedPokemon ? (
        <div className="p-6 text-center grid animate-slide-up">
          <div className="relative flex justify-center">
            <div className="absolute bottom-0 h-[15vh] flex justify-center">
              {selectedPokemon?.details?.sprites?.versions?.['generation-v']?.['black-white']
                ?.animated?.front_default ? (
                <img
                  className="max-w-[200px] h-full object-contain"
                  src={
                    selectedPokemon.details.sprites.versions['generation-v']['black-white'].animated
                      .front_default
                  }
                  alt={selectedPokemon.details.name}
                />
              ) : (
                <img className="max-w-[200px] h-full object-contain" src={notFoundPokemon} alt="" />
              )}
            </div>
          </div>

          <p className="font-bold text-md pt-4">#{selectedPokemon.details.id}</p>
          <p className="capitalize font-bold text-2xl ">{selectedPokemon.details.name}</p>
          <div className="mt-2">
            {selectedPokemon.details.types.map((x, index: number) => {
              const typeDetails = POKEMON_TYPES[x.type.name];
              return typeDetails ? (
                <span
                  key={index}
                  style={{
                    color: typeDetails.color,
                    backgroundColor: typeDetails.backgroundColor,
                  }}
                  className="px-2 py-1 font-bold uppercase text-xs rounded-md mr-2"
                >
                  {typeDetails.name}
                </span>
              ) : (
                <span className="px-2 py-1 font-bold uppercase text-xs rounded-md mr-2 bg-gray-800 text-white">
                  Mistic
                </span>
              );
            })}
          </div>
          <div className="pt-4">
            <p className="font-semibold text-md uppercase">Pokedex Entry</p>
            <p className="pt-2 w-auto text-sm">{selectedPokemon.text}</p>
          </div>
          <div className="flex  gap-2 flex-wrap   justify-between mt-4">
            <div className="grow">
              <h1 className="font-semibold text-md uppercase pb-1">Height</h1>
              <p className="bg-gray-800 text-white px-3 py-1 rounded-md">
                {selectedPokemon.details.height}m
              </p>
            </div>
            <div className="grow">
              <h1 className="font-semibold text-md uppercase pb-1">Weight</h1>
              <p className="bg-gray-800 text-white px-3 py-1 rounded-md">
                {selectedPokemon.details.weight}cm
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="font-semibold text-md uppercase  pb-1">Abilities</h1>
            <div className="flex flex-wrap gap-2  justify-center">
              {selectedPokemon.details.abilities.map((x, index) => (
                <span
                  key={index}
                  className="capitalize grow  bg-gray-800 text-white px-3 py-1 rounded-md text-center"
                >
                  {x.ability.name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h1 className="font-semibold text-md uppercase  pb-1">Stats</h1>
            <div className="flex justify-between gap-2">
              {selectedPokemon.details.stats.map((x, index) => {
                const stat = POKEMON_STATS[x.stat.name];

                return (
                  <div
                    key={index}
                    className={`p-1 grow rounded-md ${stat.bgColor} ${stat.textColor} text-center`}
                  >
                    <p className="text-sm font-semibold ">{stat.abbr}</p>
                    <p className="text-sm font-semibold">{x.base_stat}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6 -mx-6  inset-shadow-xs py-4">
            <h1 className="font-semibold text-md uppercase  ">Evolution</h1>
            <div>
              {selectedPokemon.evolution.chain.evolves_to.length > 0 ? (
                <div className="flex justify-center items-center flex-wrap">
                  <div className="cursor-pointer flex  justify-center items-center ">
                    <img
                      tabIndex={0}
                      onClick={() =>
                        getCurrentPokemon(
                          convertToPokemonID(selectedPokemon.evolution.chain.species.url),
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          getCurrentPokemon(
                            convertToPokemonID(selectedPokemon.evolution.chain.species.url),
                          );
                        }
                      }}
                      className="w-[50px]"
                      src={`${POKEMON_IMG_PATH}${selectedPokemon.evolution.chain.species.url.split('/')[6]}.png`}
                      alt=""
                    />
                  </div>
                  {selectedPokemon.evolution.chain.evolves_to.map(
                    (evolution: EvolutionChain, index: number) => (
                      <div key={index} className="flex   justify-center items-center">
                        <p className=" font-semibold   mx-2  text-sm">
                          {'Lv.' + (evolution.evolution_details[0]?.min_level ?? '?')}
                        </p>
                        <img
                          tabIndex={0}
                          className="cursor-pointer w-[50px]"
                          onClick={() =>
                            getCurrentPokemon(convertToPokemonID(evolution.species.url))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              getCurrentPokemon(convertToPokemonID(evolution.species.url));
                            }
                          }}
                          src={`${POKEMON_IMG_PATH}${evolution.species.url.split('/')[6]}.png`}
                          alt=""
                        />
                        {evolution.evolves_to.length > 0 &&
                          evolution.evolves_to.map((evo: EvolutionChain, i: number) => (
                            <div key={i} className="flex  justify-center items-center ">
                              <p className="font-semibold  text-sm  mx-2 ">
                                {'Lv.' + (evo.evolution_details[0]?.min_level ?? '?')}
                              </p>
                              <img
                                tabIndex={0}
                                className="cursor-pointer w-[50px]"
                                onClick={() =>
                                  getCurrentPokemon(convertToPokemonID(evo.species.url))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    getCurrentPokemon(convertToPokemonID(evo.species.url));
                                  }
                                }}
                                src={`${POKEMON_IMG_PATH}${evo.species.url.split('/')[6]}.png`}
                                alt=""
                              />
                            </div>
                          ))}
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <span>No evolutions available.</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center grid gap-4">
          <div className="relative flex justify-center">
            <div className="absolute bottom-0 h-[15vh] flex justify-center">
              <img className="max-w-[200px] h-full object-contain" src={notFoundPokemon} alt="" />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-md font-bold text-(--card-description-color)">
              Select a Pokémon to display here.
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentPokemon;
