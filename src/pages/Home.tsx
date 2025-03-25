import useFetchPokemon from '@/hooks/useFetchPokemon';
import { useState } from 'react';

const Home = () => {
  const { pokemon, isPending, error } = useFetchPokemon(100, 0);
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const getCurrentPokemon = async (url: string) => {
    try {
      const pokeDetails = await fetch(url).then((res) => res.json());
      const textResponse = await fetch(pokeDetails.species.url);
      const text = await textResponse.json();
      const evolutionResponse = await fetch(text.evolution_chain.url);
      const evolution = await evolutionResponse.json();
      setSelectedPokemon({
        details: pokeDetails,
        text: text.flavor_text_entries.find((x: any) => x.language.name === 'en').flavor_text,
        evolution: evolution,
      });
    } catch (err) {
      console.error('Error fetching Pokémon details:', err);
    }
  };
  return (
    <main>
      <div className="flex gap-4">
        <div className="flex-1">
          <div>
            <h2>Pokemon List</h2>
            {pokemon &&
              pokemon.map((p: any, i) => (
                <div key={i} onClick={() => getCurrentPokemon(p.url)}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`}
                    alt=""
                  />
                  <p>{p.name}</p>

                  <p>{p.types.map((x: any) => x + ' ')}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="w-[300px]">
          {selectedPokemon && (
            <div>
              <img
                src={
                  selectedPokemon.details.sprites.versions['generation-v']['black-white'].animated
                    .front_default
                }
                alt={selectedPokemon.name}
              />
              <p>N0{selectedPokemon.details.id}</p>
              <p>{selectedPokemon.name}</p>
              <p>{selectedPokemon.details.types.map((x: any) => x.type.name + ' ')}</p>
              <p>Pokedex Entry</p>
              <p>{selectedPokemon.text}</p>
              <h1>Height</h1>
              <p>{selectedPokemon.details.height}</p>
              <h1>Weight</h1>
              <p>{selectedPokemon.details.weight}</p>
              <h1>Abilities</h1>
              <p>{selectedPokemon.details.abilities.map((x: any) => x.ability.name + ' ')}</p>
              <h1>Stats</h1>
              <p>{selectedPokemon.details.stats.map((x: any) => x.base_stat + ' ')}</p>
              <h1>Evolution</h1>
              <p>
                <img
                  onClick={() =>
                    getCurrentPokemon(
                      `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.evolution.chain.species.url.split('/')[6]}/`,
                    )
                  }
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.evolution.chain.species.url.split('/')[6]}.png`}
                  alt=""
                />
                {selectedPokemon.evolution.chain.evolves_to.length > 0 ? (
                  selectedPokemon.evolution.chain.evolves_to.map(
                    (evolution: any, index: number) => (
                      <span key={index}>
                        {
                          <>
                            <span>
                              {'Lv.' + (evolution.evolution_details[0]?.min_level ?? '?')}
                            </span>
                          </>
                        }
                        <img
                          onClick={() =>
                            getCurrentPokemon(
                              `https://pokeapi.co/api/v2/pokemon/${evolution.species.url.split('/')[6]}/`,
                            )
                          }
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.species.url.split('/')[6]}.png`}
                          alt=""
                        />
                        {evolution.evolves_to && evolution.evolves_to.length > 0 && (
                          <>
                            {evolution.evolves_to.map((evo: any, i: number) => (
                              <span key={i}>
                                <span> {'Lv.' + (evo.evolution_details[0].min_level ?? '?')}</span>
                                <img
                                  onClick={() =>
                                    getCurrentPokemon(
                                      `https://pokeapi.co/api/v2/pokemon/${evo.species.url.split('/')[6]}/`,
                                    )
                                  }
                                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.species.url.split('/')[6]}.png`}
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
      </div>
    </main>
  );
};

export default Home;
