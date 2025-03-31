import { POKEMON_IMG_PATH, POKEMON_STATS, POKEMON_TYPES } from '@/config';
import { EvolutionChain } from '@/utils/interface/pokemon';
import { useNavigate, useParams } from 'react-router';
import notFoundPokemon from '@/assets/notFoundPokemon.png';
import usePokemon, { navigateToPokemon } from '@/hooks/useFetchPokemon';

const CurrentPokemonMobile = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedPokemon, isPending, error } = usePokemon(Number(id));

  const closeCard = () => {
    navigate('/');
    document.body.style.overflow = 'auto';
  };

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 h-full w-full bg-(--color-light) shadow-md transition-opacity ${id ? 'block' : 'hidden'}`}
    >
      <button
        onClick={closeCard}
        className="absolute top-4 right-4 z-1 cursor-pointer rounded-md bg-black px-2 py-1 text-white transition-all hover:bg-gray-700"
      >
        X
      </button>
      {isPending ? (
        <div className="flex h-full items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <p className="text-(--card-description-color)">{error}</p>
        </div>
      ) : (
        selectedPokemon && (
          <div className="grid h-full overflow-auto p-6 text-center">
            <div>
              <div className="relative flex justify-center">
                <div className="flex justify-center">
                  {selectedPokemon?.details?.sprites?.versions?.['generation-v']?.['black-white']
                    ?.animated?.front_default ? (
                    <img
                      className="h-full w-[180px] object-contain"
                      src={
                        selectedPokemon.details.sprites.versions['generation-v']['black-white']
                          .animated.front_default
                      }
                      alt={selectedPokemon.details.name}
                    />
                  ) : (
                    <img className="h-full w-[180px] object-contain" src={notFoundPokemon} alt="" />
                  )}
                </div>
              </div>
              <p className="text-md pt-4 font-bold">#{selectedPokemon.details.id}</p>
              <p className="text-2xl font-bold capitalize">{selectedPokemon.details.name}</p>
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
                      className="mr-2 rounded-md px-2 py-1 text-xs font-bold uppercase"
                    >
                      {typeDetails.name}
                    </span>
                  ) : (
                    <span className="mr-2 rounded-md bg-gray-800 px-2 py-1 text-xs font-bold text-white uppercase">
                      Mistic
                    </span>
                  );
                })}
              </div>
              <div className="pt-4">
                <p className="text-md font-semibold uppercase">Pokedex Entry</p>
                <p className="w-auto pt-2 text-sm">{selectedPokemon.text}</p>
              </div>
              <div className="mt-4 flex flex-wrap justify-between gap-2">
                <div className="grow">
                  <h1 className="text-md pb-1 font-semibold uppercase">Height</h1>
                  <p className="rounded-md bg-gray-800 px-3 py-1 text-white">
                    {selectedPokemon.details.height}m
                  </p>
                </div>
                <div className="grow">
                  <h1 className="text-md pb-1 font-semibold uppercase">Weight</h1>
                  <p className="rounded-md bg-gray-800 px-3 py-1 text-white">
                    {selectedPokemon.details.weight}cm
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-md pb-1 font-semibold uppercase">Abilities</h1>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedPokemon.details.abilities.map((x, index) => (
                    <span
                      key={index}
                      className="grow rounded-md bg-gray-800 px-3 py-1 text-center text-white capitalize"
                    >
                      {x.ability.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-md pb-1 font-semibold uppercase">Stats</h1>
                <div className="flex justify-between gap-2">
                  {selectedPokemon.details.stats.map((x, index) => {
                    const stat = POKEMON_STATS[x.stat.name];

                    return (
                      <div
                        key={index}
                        className={`grow rounded-md p-1 ${stat.bgColor} ${stat.textColor} text-center`}
                      >
                        <p className="text-sm font-semibold">{stat.abbr}</p>
                        <p className="text-sm font-semibold">{x.base_stat}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="-mx-6 mt-6 border-t-1 border-t-indigo-100 py-4">
                <h1 className="text-md font-semibold uppercase">Evolution</h1>
                <div>
                  {selectedPokemon.evolution.chain.evolves_to.length > 0 ? (
                    <div className="flex flex-wrap items-center justify-center">
                      <div className="flex cursor-pointer items-center justify-center">
                        <img
                          tabIndex={0}
                          onClick={() =>
                            navigateToPokemon(selectedPokemon.evolution.chain.species.url, navigate)
                          }
                          className="w-[80px]"
                          src={`${POKEMON_IMG_PATH}${selectedPokemon.evolution.chain.species.url.split('/')[6]}.png`}
                          alt=""
                        />
                      </div>
                      {selectedPokemon.evolution.chain.evolves_to.map(
                        (evolution: EvolutionChain, index: number) => (
                          <div key={index} className="flex items-center justify-center">
                            <p className="mx-2 text-sm font-semibold">
                              {'Lv.' + (evolution.evolution_details[0]?.min_level ?? '?')}
                            </p>
                            <img
                              tabIndex={0}
                              className="w-[80px] cursor-pointer"
                              onClick={() => navigateToPokemon(evolution.species.url, navigate)}
                              src={`${POKEMON_IMG_PATH}${evolution.species.url.split('/')[6]}.png`}
                              alt=""
                            />
                            {evolution.evolves_to.length > 0 &&
                              evolution.evolves_to.map((evo: EvolutionChain, i: number) => (
                                <div key={i} className="flex items-center justify-center">
                                  <p className="mx-2 text-sm font-semibold">
                                    {'Lv.' + (evo.evolution_details[0]?.min_level ?? '?')}
                                  </p>
                                  <img
                                    tabIndex={0}
                                    className="w-[80px] cursor-pointer"
                                    onClick={() => navigateToPokemon(evo.species.url, navigate)}
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
          </div>
        )
      )}
    </div>
  );
};

export default CurrentPokemonMobile;
