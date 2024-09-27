import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { excluirHotel, isFavorito, adicionarFavorito, removerFavorito } from '../utils/localStorage';
import { useFeedback } from '../contexts/FeedbackContext';
import fallbackImage from '../assets/hotel-placeholder.jpg';

function HotelCard({ hotel }) {
  const { showFeedback } = useFeedback();
  const favorito = isFavorito(hotel.id);

  const handleExcluir = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este hotel?')) {
      excluirHotel(hotel.id);
      showFeedback('Hotel excluído com sucesso', 'success');
    }
  };

  const handleFavorito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorito) {
      removerFavorito(hotel.id);
      showFeedback('Hotel removido dos favoritos', 'info');
    } else {
      adicionarFavorito(hotel.id);
      showFeedback('Hotel adicionado aos favoritos', 'success');
    }
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
      <CardMedia
        component="img"
        height="200"
        image={hotel.imagem}
        alt={hotel.nome}
        onError={handleImageError}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            {hotel.nome}
          </Typography>
          <IconButton onClick={handleFavorito} color={favorito ? "secondary" : "default"}>
            {favorito ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {hotel.cidade}, {hotel.estado}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={hotel.estrelas} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({hotel.estrelas})
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          R$ {hotel.diaria.toFixed(2)} / noite
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
          <Button component={Link} to={`/hotel/${hotel.id}`} variant="contained" color="primary" size="small">
            Ver Detalhes
          </Button>
          <Button onClick={handleExcluir} variant="contained" color="error" size="small">
            Excluir
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default HotelCard;