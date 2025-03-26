import { POKEMON_IMG_PATH } from '@/config';
import useFetchPokemon from '@/hooks/useFetchPokemon';
import { Pokemons } from '@/utils/interface/pokemons';
import { useNavigate } from 'react-router';

const PokemonsList = () => {
  const { pokemons, isPending, error } = useFetchPokemon(100, 0);
  const navigate = useNavigate();

  const getCurrentPokemon = (currentPokemonID: number) => {
    navigate(`/${currentPokemonID}`);
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {pokemons &&
        pokemons.map((p: Pokemons, i) => (
          <div key={i} onClick={() => getCurrentPokemon(i + 1)}>
            <img src={`${POKEMON_IMG_PATH}${i + 1}.png`} alt="" />
            <p>{p.name}</p>
            <p>{p.types.map((x: string) => x + ' ')}</p>
          </div>
        ))}
    </div>
  );
};

export default PokemonsList;
