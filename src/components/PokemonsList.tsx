import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { POKEMON_IMG_PATH, POKEMON_TYPES } from '@/config';
import useFetchPokemons from '@/hooks/useFetchPokemons';
import { Pokemons } from '@/utils/interface/pokemons';
import notFoundPokemon from '@/assets/notFoundPokemon.png';

const PokemonsList = () => {
  const { pokemons, isPending, error } = useFetchPokemons(1025);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [submitSearchTerm, setSubmitSearchTerm] = useState('');
  const [visiblePokemons, setVisiblePokemons] = useState(30);

  const getCurrentPokemon = (currentPokemonID: number) => navigate(`/${currentPokemonID}`);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(submitSearchTerm.trim().toLowerCase()),
  );

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setVisiblePokemons((prev) => Math.min(prev + 30, pokemons.length));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pokemons.length]);

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="h-auto">
          <img className="max-w-[200px]" src={notFoundPokemon} alt="Not Found Pokemon" />
        </div>
        <div className="mt-4 w-full">
          <p className="ml-4 text-[var(--card-description-color)]">{error.message}</p>
        </div>
      </div>
    );

  return (
    <>
      <div className="mb-20 flex w-full justify-center">
        <input
          type="text"
          className="h-12 w-full rounded-l-3xl bg-(--card-color) px-4 text-lg shadow-md transition-all outline-none focus:ring-2"
          placeholder="Search Pokémon..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSubmitSearchTerm(e.currentTarget.value);
            }
          }}
        />
        <button
          onClick={() => setSubmitSearchTerm(searchTerm)}
          className="cursor-pointer rounded-r-3xl bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition-all hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-16">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.slice(0, visiblePokemons).map((p: Pokemons, i) => {
            const index = pokemons.indexOf(p) + 1;
            return (
              <div
                key={index}
                tabIndex={0}
                className={`relative flex w-60 grow cursor-pointer flex-col items-center justify-center rounded-3xl bg-(--card-color) px-3 pt-12 pb-6 hover:shadow-2xl ${
                  id === index.toString() ? 'shadow-2xl' : 'shadow-lg'
                }`}
                onKeyDown={(e) => e.key === 'Enter' && getCurrentPokemon(index)}
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
                <p className="absolute -top-2 right-2 rounded-md bg-black px-2 py-1 text-xs font-bold text-white">
                  N°{index}
                </p>
                <p className="text-center text-lg font-bold text-(--card-description-color) capitalize">
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
                        className="mr-2 rounded-md px-2 py-1 text-xs font-bold uppercase"
                      >
                        {typeDetails?.name || 'Mystic'}
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
