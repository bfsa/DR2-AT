import React from 'react';
import { Typography, Button, Box, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Home() {
  return (
    <Container maxWidth="lg">
      <Paper elevation={10} sx={{ p: 4, mt: 2 }}>
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Qual Hotel?
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button component={Link} to="/hoteis" variant="contained" color="primary" size="large">
            Explorar Hotéis 😎
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;