import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HotelCard from '../components/HotelCard';
import { getHoteis } from '../utils/localStorage';

function ListagemHoteis() {
  const [hoteis, setHoteis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ordenacao, setOrdenacao] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setHoteis(getHoteis());
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOrdenacaoChange = (event) => {
    setOrdenacao(event.target.value);
  };

  const filteredHoteis = hoteis
    .filter((hotel) =>
      hotel.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.estado.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (ordenacao) {
        case 'preco-asc': return a.diaria - b.diaria;
        case 'preco-desc': return b.diaria - a.diaria;
        case 'estrelas-asc': return a.estrelas - b.estrelas;
        case 'estrelas-desc': return b.estrelas - a.estrelas;
        default: return 0;
      }
    });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Hotéis Disponíveis
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Pesquisar hotéis..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: isMobile ? '100%' : 200 }}>
          <InputLabel id="ordenacao-label">Ordenar por</InputLabel>
          <Select
            labelId="ordenacao-label"
            value={ordenacao}
            label="Ordenar por"
            onChange={handleOrdenacaoChange}
          >
            <MenuItem value="">Nenhum</MenuItem>
            <MenuItem value="preco-asc">Preço (menor para maior)</MenuItem>
            <MenuItem value="preco-desc">Preço (maior para menor)</MenuItem>
            <MenuItem value="estrelas-asc">Estrelas (menor para maior)</MenuItem>
            <MenuItem value="estrelas-desc">Estrelas (maior para menor)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {filteredHoteis.map((hotel) => (
          <Box key={hotel.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)' } }}>
            <HotelCard hotel={hotel} />
          </Box>
        ))}
      </Box>
      {filteredHoteis.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
          Nenhum hotel encontrado.
        </Typography>
      )}
    </Container>
  );
}

export default ListagemHoteis;