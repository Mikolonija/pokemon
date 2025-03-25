import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import pokemon from '@/assets/pokemon.webp'; // with import

const App = () => {
  return (
    <>
      <img src={pokemon} alt="" className="-z-1 absolute top-[-80px] left-[-80px] " />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
