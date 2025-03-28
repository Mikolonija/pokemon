import CurrentPokemon from '@/components/CurrentPokemon';
import PokemonsList from '@/components/PokemonsList';

const Home = () => {
  return (
    <main>
      <div className="flex gap-6 my-40 ">
        <div className="flex-1 ml-6 ">
          <PokemonsList />
        </div>
        <div className="lg:w-[300px] md:w-[0] ">
          <CurrentPokemon />
        </div>
      </div>
    </main>
  );
};

export default Home;
