import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ListagemHoteis from '../pages/ListagemHoteis';
import DetalhesHotel from '../pages/DetalhesHotel';
import CadastroHotel from '../pages/CadastroHotel';
import EditarHotel from '../pages/EditarHotel';
import HoteisFavoritos from '../pages/HoteisFavoritos';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hoteis" element={<ListagemHoteis />} />
      <Route path="/hotel/:id" element={<DetalhesHotel />} />
      <Route path="/cadastro-hotel" element={<CadastroHotel />} />
      <Route path="/editar-hotel/:id" element={<EditarHotel />} />
      <Route path="/favoritos" element={<HoteisFavoritos />} />
    </Routes>
  );
}

export default AppRoutes;