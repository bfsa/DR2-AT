import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Button, Rating, Box, Paper, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { getHotelPorId, excluirHotel } from '../utils/localStorage';
import { useFeedback } from '../contexts/FeedbackContext';
import fallbackImage from '../assets/hotel-placeholder.jpg';

function DetalhesHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showFeedback } = useFeedback();
  const [hotel, setHotel] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const hotelData = getHotelPorId(id);
    if (hotelData) {
      setHotel(hotelData);
    } else {
      showFeedback('Hotel não encontrado', 'error');
      navigate('/hoteis');
    }
  }, [id, navigate, showFeedback]);

  const handleExcluir = () => {
    setOpenDialog(true);
  };

  const confirmarExclusao = () => {
    excluirHotel(id);
    setOpenDialog(false);
    showFeedback('Hotel excluído com sucesso', 'success');
    navigate('/hoteis');
  };

  if (!hotel) return null;

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <img 
              src={hotel.imagem} 
              alt={hotel.nome} 
              onError={(e) => { e.target.src = fallbackImage; }}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
            />
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {hotel.nome}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={hotel.estrelas} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({hotel.estrelas} estrelas)
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {hotel.cidade}, {hotel.estado}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Diária: R$ {hotel.diaria.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {hotel.descricao}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Itens e Serviços:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {hotel.itensEServicos.map((item, index) => (
                <Chip key={index} label={item} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button component={Link} to={`/editar-hotel/${hotel.id}`} variant="contained" color="primary">
                Editar Hotel
              </Button>
              <Button variant="contained" color="error" onClick={handleExcluir}>
                Excluir Hotel
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este hotel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={confirmarExclusao} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DetalhesHotel;