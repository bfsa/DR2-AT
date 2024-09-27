import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Rating, Box, Paper } from '@mui/material';
import { getHotelPorId, atualizarHotel } from '../utils/localStorage';
import { useFeedback } from '../contexts/FeedbackContext';

function EditarHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showFeedback } = useFeedback();
  const [hotel, setHotel] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const hotelExistente = getHotelPorId(id);
    if (hotelExistente) {
      setHotel({
        ...hotelExistente,
        itensEServicos: hotelExistente.itensEServicos.join(', ')
      });
    } else {
      showFeedback('Hotel não encontrado', 'error');
      navigate('/hoteis');
    }
  }, [id, navigate, showFeedback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel(prevHotel => ({
      ...prevHotel,
      [name]: value
    }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleEstrelas = (event, newValue) => {
    setHotel(prevHotel => ({
      ...prevHotel,
      estrelas: newValue
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.nome = hotel.nome ? "" : "Nome é obrigatório";
    tempErrors.imagem = hotel.imagem ? "" : "URL da imagem é obrigatória";
    tempErrors.cidade = hotel.cidade ? "" : "Cidade é obrigatória";
    tempErrors.estado = hotel.estado ? "" : "Estado é obrigatório";
    tempErrors.diaria = hotel.diaria ? "" : "Preço da diária é obrigatório";
    if (hotel.diaria && parseFloat(hotel.diaria) <= 0) {
      tempErrors.diaria = "O preço da diária deve ser maior que zero";
    }
    tempErrors.descricao = hotel.descricao ? "" : "Descrição é obrigatória";
    tempErrors.itensEServicos = hotel.itensEServicos ? "" : "Itens e serviços são obrigatórios";

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const hotelAtualizado = {
        ...hotel,
        diaria: parseFloat(hotel.diaria),
        itensEServicos: hotel.itensEServicos.split(',').map(item => item.trim())
      };
      try {
        atualizarHotel(hotelAtualizado);
        showFeedback('Hotel atualizado com sucesso!', 'success');
        setTimeout(() => navigate(`/hotel/${id}`), 2000);
      } catch (error) {
        showFeedback(error.message, 'error');
      }
    }
  };

  if (!hotel) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Editar Hotel
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome do Hotel"
            name="nome"
            value={hotel.nome}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.nome}
            helperText={errors.nome}
          />
          <TextField
            fullWidth
            label="URL da Imagem"
            name="imagem"
            value={hotel.imagem}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.imagem}
            helperText={errors.imagem}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography component="legend">Classificação em Estrelas</Typography>
            <Rating
              name="estrelas"
              value={hotel.estrelas}
              onChange={handleEstrelas}
            />
          </Box>
          <TextField
            fullWidth
            label="Cidade"
            name="cidade"
            value={hotel.cidade}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.cidade}
            helperText={errors.cidade}
          />
          <TextField
            fullWidth
            label="Estado"
            name="estado"
            value={hotel.estado}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.estado}
            helperText={errors.estado}
          />
          <TextField
            fullWidth
            label="Preço da Diária"
            name="diaria"
            type="number"
            value={hotel.diaria}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.diaria}
            helperText={errors.diaria}
          />
          <TextField
            fullWidth
            label="Descrição"
            name="descricao"
            value={hotel.descricao}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
            error={!!errors.descricao}
            helperText={errors.descricao}
          />
          <TextField
            fullWidth
            label="Itens e Serviços (separados por vírgula)"
            name="itensEServicos"
            value={hotel.itensEServicos}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
            error={!!errors.itensEServicos}
            helperText={errors.itensEServicos}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Atualizar Hotel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default EditarHotel;