import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import pokemon from '@/assets/pokemon.webp';

const App = () => {
  return (
    <div className="max-w-(--screen-lg) h-full mx-auto">
      <img src={pokemon} alt="" className="-z-1 absolute top-[-80px] left-[-80px] " />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
