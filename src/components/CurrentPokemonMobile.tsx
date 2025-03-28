import { POKEMON_IMG_PATH, POKEMON_STATS, POKEMON_TYPES } from '@/config';
import { EvolutionChain } from '@/utils/interface/pokemon';
import { useNavigate, useParams } from 'react-router';
import notFoundPokemon from '@/assets/notFoundPokemon.png';
import usePokemon, { navigateToPokemon } from '@/hooks/useFetchPokemon';

const CurrentPokemonMobile = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedPokemon, loading, error } = usePokemon(Number(id));

  const closeCard = () => {
    navigate('/');
    document.body.style.overflow = 'auto';
  };

  return (
    <div
      className={`fixed bottom-0 left-0 top-0 w-full h-full  bg-(--color-light)  shadow-md transition-opacity ${id ? ' block' : 'hidden'}`}
    >
      <button
        onClick={closeCard}
        className="absolute z-1 top-4 right-4 text-white bg-black px-2 py-1 rounded-md cursor-pointer hover:bg-gray-700 transition-all"
      >
        X
      </button>
      {loading ? (
        <div className="flex items-center justify-center  h-full">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center  text-center">
          <p className="text-(--card-description-color)">{error}</p>
        </div>
      ) : (
        selectedPokemon && (
          <div className="p-6 text-center grid  h-full overflow-auto">
            <div>
              <div className="relative flex justify-center">
                <div className=" flex justify-center ">
                  {selectedPokemon?.details?.sprites?.versions?.['generation-v']?.['black-white']
                    ?.animated?.front_default ? (
                    <img
                      className="w-[180px] h-full object-contain "
                      src={
                        selectedPokemon.details.sprites.versions['generation-v']['black-white']
                          .animated.front_default
                      }
                      alt={selectedPokemon.details.name}
                    />
                  ) : (
                    <img className="w-[180px] h-full object-contain" src={notFoundPokemon} alt="" />
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
                <h1 className="font-semibold text-md uppercase pb-1">Stats</h1>
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
                            navigateToPokemon(selectedPokemon.evolution.chain.species.url, navigate)
                          }
                          className="w-[80px]"
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
                              className="cursor-pointer w-[80px]"
                              onClick={() => navigateToPokemon(evolution.species.url, navigate)}
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
                                    className="cursor-pointer w-[80px]"
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
