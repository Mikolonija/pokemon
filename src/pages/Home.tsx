import CurrentPokemon from '@/components/CurrentPokemon';
import CurrentPokemonMobile from '@/components/CurrentPokemonMobile';
import PokemonsList from '@/components/PokemonsList';

const Home = () => {
  return (
    <main>
      <div className="flex   ">
        <div className="flex-1 mx-6  my-12">
          <PokemonsList />
        </div>
        <div className="w-[300px] hidden lg:block mt-44">
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
