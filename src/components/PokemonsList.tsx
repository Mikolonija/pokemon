import { POKEMON_IMG_PATH, POKEMON_TYPES } from '@/config';
import useFetchPokemon from '@/hooks/useFetchPokemon';
import { Pokemons } from '@/utils/interface/pokemons';
import { useNavigate, useParams } from 'react-router';

const PokemonsList = () => {
  const { pokemons, isPending, error } = useFetchPokemon(1025, 0);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getCurrentPokemon = (currentPokemonID: number) => {
    navigate(`/${currentPokemonID}`);
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-16 justify-center">
      {pokemons &&
        pokemons.map((p: Pokemons, i) => (
          <div
            className={`bg-(--card-color) relative w-60 px-3  rounded-3xl pt-12 pb-6 justify-center items-center flex flex-col cursor-pointer grow  hover:shadow-2xl ${id === (i + 1).toString() ? ' shadow-2xl' : 'shadow-lg'}`}
            key={i}
            onClick={() => getCurrentPokemon(i + 1)}
          >
            <img
              src={`${POKEMON_IMG_PATH}${i + 1}.png`}
              alt=""
              className="absolute -top-12"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                (e.target as HTMLImageElement).src = '/src/assets/notFoundPokemon.png';
                (e.target as HTMLImageElement).width = 96;
              }}
            />
            <p className="font-bold text-xs text-[#ffffff] bg-[#000000] px-2 py-1 rounded-md absolute -top-2 right-2">
              N°{i + 1}
            </p>
            <p className="capitalize font-bold text-center text-lg text-(--card-description-color)">
              {p.name ? p.name : 'Unknow'}
            </p>
            <div>
              <p className="mt-3">
                {p.types.map((typeId: string) => {
                  const typeDetails = POKEMON_TYPES[typeId];
                  return typeDetails ? (
                    <span
                      key={typeId}
                      style={{
                        color: typeDetails.color,
                        backgroundColor: typeDetails.backgroundColor,
                      }}
                      className="px-2 py-1 font-bold uppercase  text-xs rounded-md mr-2 "
                    >
                      {typeDetails.name}
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-bold uppercase text-xs rounded-md mr-2 bg-gray-800 text-white">
                      Mistic
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PokemonsList;
