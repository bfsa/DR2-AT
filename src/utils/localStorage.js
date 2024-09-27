const HOTEIS_KEY = 'hoteis';
const FAVORITOS_KEY = 'hoteisFavoritos';
const THEME_PREFERENCE_KEY = 'themePreference';

export function getHoteis() {
  const hoteis = localStorage.getItem(HOTEIS_KEY);
  return hoteis ? JSON.parse(hoteis) : [];
}

export function salvarHoteis(hoteis) {
  localStorage.setItem(HOTEIS_KEY, JSON.stringify(hoteis));
}

export function getHotelPorId(id) {
  const hoteis = getHoteis();
  const hotel = hoteis.find(hotel => hotel.id === id.toString());
  if (!hotel) {
    console.error(`Hotel com id ${id} não encontrado`);
    return null;
  }
  return hotel;
}

function getProximoId(hoteis) {
  if (hoteis.length === 0) {
    return 1;
  }
  const maiorId = Math.max(...hoteis.map(hotel => Number(hotel.id)));
  return maiorId + 1;
}

export function adicionarHotel(novoHotel) {
  const hoteis = getHoteis();
  const id = getProximoId(hoteis);
  const hotelComId = { ...novoHotel, id: id.toString() }; // Convertendo para string
  hoteis.push(hotelComId);
  salvarHoteis(hoteis);
  
  window.dispatchEvent(new Event('storage'));
  
  return hotelComId;
}

export function inicializarHoteis() {
  const hoteisArmazenados = getHoteis();
  if (hoteisArmazenados.length === 0) {
    const hoteisExemplo = [
      {
        nome: 'Hotel Copacabana Palace',
        imagem: 'https://exemplo.com/copacabana.jpg',
        imagensAdicionais: [
          'https://exemplo.com/copacabana2.jpg',
          'https://exemplo.com/copacabana3.jpg',
          'https://exemplo.com/copacabana4.jpg',
        ],
        estrelas: 5,
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        diaria: 1500,
        descricao: 'Um luxuoso hotel à beira-mar em Copacabana, oferecendo vistas deslumbrantes e serviço de classe mundial.',
        itensEServicos: [
          'Piscina de borda infinita',
          'Spa de luxo',
          'Restaurantes gourmet',
          'Serviço de quarto 24 horas',
          'Academia completa',
        ],
      },
      // Adicione mais hotéis de exemplo aqui
    ];

    const hoteisComIds = hoteisExemplo.map(hotel => adicionarHotel(hotel));
    return hoteisComIds;
  }
  return hoteisArmazenados;
}

export function atualizarHotel(hotelAtualizado) {
  const hoteis = getHoteis();
  const index = hoteis.findIndex(hotel => hotel.id === hotelAtualizado.id);
  if (index !== -1) {
    hoteis[index] = hotelAtualizado;
    salvarHoteis(hoteis);
    window.dispatchEvent(new Event('storage'));
  }
}

export function excluirHotel(id) {
  let hoteis = getHoteis();
  hoteis = hoteis.filter(hotel => hotel.id !== id);
  salvarHoteis(hoteis);
  window.dispatchEvent(new Event('storage'));
}

export function getFavoritos() {
  const favoritos = localStorage.getItem(FAVORITOS_KEY);
  return favoritos ? JSON.parse(favoritos) : [];
}

export function salvarFavoritos(favoritos) {
  localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
}

export function adicionarFavorito(hotelId) {
  const favoritos = getFavoritos();
  if (!favoritos.includes(hotelId)) {
    favoritos.push(hotelId);
    salvarFavoritos(favoritos);
  }
}

export function removerFavorito(hotelId) {
  const favoritos = getFavoritos();
  const index = favoritos.indexOf(hotelId);
  if (index > -1) {
    favoritos.splice(index, 1);
    salvarFavoritos(favoritos);
  }
}

export function isFavorito(hotelId) {
  const favoritos = getFavoritos();
  return favoritos.includes(hotelId);
}

export function getThemePreference() {
  return localStorage.getItem(THEME_PREFERENCE_KEY) || 'light';
}

export function saveThemePreference(theme) {
  localStorage.setItem(THEME_PREFERENCE_KEY, theme);
}