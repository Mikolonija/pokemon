import CurrentPokemon from '@/components/CurrentPokemon';
import PokemonsList from '@/components/PokemonsList';

const Home = () => {
  return (
    <main>
      <div className="flex gap-6 my-40">
        <div className="flex-1">
          <PokemonsList />
        </div>
        <div className="w-[300px]">
          <CurrentPokemon />
        </div>
      </div>
    </main>
  );
};

export default Home;
