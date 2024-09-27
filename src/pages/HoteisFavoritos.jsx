import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import HotelCard from '../components/HotelCard';
import { getHoteis, getFavoritos } from '../utils/localStorage';

function HoteisFavoritos() {
  const [hoteisFavoritos, setHoteisFavoritos] = useState([]);

  useEffect(() => {
    const carregarFavoritos = () => {
      const todosHoteis = getHoteis();
      const favoritos = getFavoritos();
      const hoteisFav = todosHoteis.filter(hotel => favoritos.includes(hotel.id));
      setHoteisFavoritos(hoteisFav);
    };

    carregarFavoritos();
    window.addEventListener('storage', carregarFavoritos);

    return () => {
      window.removeEventListener('storage', carregarFavoritos);
    };
  }, []);

  const handleFavoriteChange = () => {
    const todosHoteis = getHoteis();
    const favoritos = getFavoritos();
    const hoteisFav = todosHoteis.filter(hotel => favoritos.includes(hotel.id));
    setHoteisFavoritos(hoteisFav);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Hotéis Favoritos
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {hoteisFavoritos.map((hotel) => (
          <Box key={hotel.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)' } }}>
            <HotelCard hotel={hotel} onFavoriteChange={handleFavoriteChange} />
          </Box>
        ))}
      </Box>
      {hoteisFavoritos.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
          Você ainda não tem hotéis favoritos.
        </Typography>
      )}
    </Container>
  );
}

export default HoteisFavoritos;