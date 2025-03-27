import { POKEMON_IMG_PATH } from '@/config';
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
    <div className="fixed w-[300px] h-full bg-(--card-color) shadow-lg rounded-3xl ">
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
          {/* Pokemon Image */}
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

          {/* Pokemon Info */}
          <p>N0{selectedPokemon.details.id}</p>
          <p className="capitalize">{selectedPokemon.details.name}</p>
          <p>{selectedPokemon.details.types.map((x) => x.type.name).join(', ')}</p>

          {/* Pokedex Entry */}
          <div>
            <p className="font-semibold">Pokedex Entry</p>
            <p>{selectedPokemon.text}</p>
          </div>

          {/* Stats */}
          <h1 className="font-semibold">Height</h1>
          <p>{selectedPokemon.details.height}</p>
          <h1 className="font-semibold">Weight</h1>
          <p>{selectedPokemon.details.weight}</p>
          <h1 className="font-semibold">Abilities</h1>
          <p>{selectedPokemon.details.abilities.map((x) => x.ability.name).join(', ')}</p>
          <h1 className="font-semibold">Stats</h1>
          <p>{selectedPokemon.details.stats.map((x) => x.base_stat).join(', ')}</p>

          {/* Evolution */}
          <h1 className="font-semibold">Evolution</h1>
          <p>
            <img
              className="cursor-pointer"
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
                    <span>{'Lv.' + (evolution.evolution_details[0]?.min_level ?? '?')}</span>
                    <img
                      className="cursor-pointer"
                      onClick={() => getCurrentPokemon(convertToPokemonID(evolution.species.url))}
                      src={`${POKEMON_IMG_PATH}${evolution.species.url.split('/')[6]}.png`}
                      alt=""
                    />
                    {evolution.evolves_to.length > 0 &&
                      evolution.evolves_to.map((evo: EvolutionChain, i: number) => (
                        <span key={i}>
                          <span>{'Lv.' + (evo.evolution_details[0]?.min_level ?? '?')}</span>
                          <img
                            className="cursor-pointer"
                            onClick={() => getCurrentPokemon(convertToPokemonID(evo.species.url))}
                            src={`${POKEMON_IMG_PATH}${evo.species.url.split('/')[6]}.png`}
                            alt=""
                          />
                        </span>
                      ))}
                  </span>
                ),
              )
            ) : (
              <span>No evolutions available.</span>
            )}
          </p>
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
