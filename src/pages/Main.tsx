import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '@/pages/Home';
import pokemon from '@/assets/pokemon.webp';

const Main = () => {
  return (
    <div className="mx-auto h-full max-w-(--screen-lg)">
      <img src={pokemon} alt="" className="fixed top-[-80px] left-[-80px] -z-1" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <img
        src={pokemon}
        alt=""
        className="fixed right-[-80px] bottom-[-80px] -z-1 hidden lg:block"
      />
    </div>
  );
};

export default Main;
