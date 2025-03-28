import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import pokemon from '@/assets/pokemon.webp';

const App = () => {
  return (
    <div className="max-w-(--screen-lg) h-full mx-auto">
      <img src={pokemon} alt="" className="hidden sm:block -z-1 fixed top-[-80px] left-[-80px] " />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <img
        src={pokemon}
        alt=""
        className="hidden lg:block -z-1 fixed bottom-[-80px] right-[-80px] "
      />
    </div>
  );
};

export default App;
