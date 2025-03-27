import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { POKEMON_IMG_PATH, POKEMON_TYPES } from '@/config';
import useFetchPokemon from '@/hooks/useFetchPokemon';
import { Pokemons } from '@/utils/interface/pokemons';

const PokemonsList = () => {
  const { pokemons, isPending, error } = useFetchPokemon(1025);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [submitSearchTerm, setSubmitSearchTerm] = useState('');

  const getCurrentPokemon = (currentPokemonID: number) => navigate(`/${currentPokemonID}`);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(submitSearchTerm.trim().toLowerCase()),
  );

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSubmitSearchTerm(event.currentTarget.value);
    }
  };

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center">
        <p className="text-(--card-description-color)">{error.message}</p>
      </div>
    );

  return (
    <>
      <div className="w-full flex justify-center mb-20">
        <input
          type="text"
          className="w-full bg-(--card-color) h-12 px-4 rounded-l-3xl shadow-md text-lg outline-none transition-all focus:ring-2 focus:ring-blue-500"
          placeholder="Search Pokémon..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button
          onClick={() => setSubmitSearchTerm(searchTerm)}
          className="px-6 py-2 bg-blue-600 text-white font-semibold  rounded-r-3xl shadow-md hover:bg-blue-700 transition-all cursor-pointer"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-16 justify-center">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((p: Pokemons, i) => {
            const index = pokemons.indexOf(p) + 1;

            return (
              <div
                key={index}
                className={`bg-(--card-color) relative w-60 px-3 rounded-3xl pt-12 pb-6 flex flex-col justify-center items-center cursor-pointer grow hover:shadow-2xl ${
                  id === index.toString() ? 'shadow-2xl' : 'shadow-lg'
                }`}
                onClick={() => getCurrentPokemon(index)}
              >
                <img
                  src={`${POKEMON_IMG_PATH}${index}.png`}
                  alt={p.name}
                  className="absolute -top-12"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    (e.target as HTMLImageElement).src = '/src/assets/notFoundPokemon.png';
                    (e.target as HTMLImageElement).width = 96;
                  }}
                />
                <p className="font-bold text-xs text-white bg-black px-2 py-1 rounded-md absolute -top-2 right-2">
                  N°{index}
                </p>
                <p className="capitalize font-bold text-lg text-center text-(--card-description-color)">
                  {p.name || 'Unknown'}
                </p>
                <div className="mt-3">
                  {p.types.map((typeId: string) => {
                    const typeDetails = POKEMON_TYPES[typeId];
                    return (
                      <span
                        key={typeId}
                        style={{
                          color: typeDetails?.color || 'white',
                          backgroundColor: typeDetails?.backgroundColor || 'gray',
                        }}
                        className="px-2 py-1 font-bold uppercase text-xs rounded-md mr-2"
                      >
                        {typeDetails?.name || 'Mistic'}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-lg text-gray-500">No Pokémon found.</p>
        )}
      </div>
    </>
  );
};

export default PokemonsList;
