import CurrentPokemon from '@/components/CurrentPokemon';
import CurrentPokemonMobile from '@/components/CurrentPokemonMobile';
import PokemonsList from '@/components/PokemonsList';

const Home = () => {
  return (
    <main>
      <div className="flex">
        <div className="mx-6 my-12 flex-1">
          <PokemonsList />
        </div>
        <div className="mt-44 hidden w-[300px] lg:block">
          <CurrentPokemon />
        </div>
        <div className="block lg:hidden">
          <CurrentPokemonMobile />
        </div>
      </div>
    </main>
  );
};

export default Home;
