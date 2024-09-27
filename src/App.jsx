import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { FeedbackProvider } from './contexts/FeedbackContext';
import Header from './components/Header';
import { getThemePreference, saveThemePreference } from './utils/localStorage';

function App() {
  const [mode, setMode] = useState(getThemePreference());

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#1e3a8a' : '#90caf9',
          },
          secondary: {
            main: mode === 'light' ? '#f59e0b' : '#f48fb1',
          },
          background: {
            default: mode === 'light' ? '#f3f4f6' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 600,
          },
          h2: {
            fontWeight: 600,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 500,
          },
          h6: {
            fontWeight: 500,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 500,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    saveThemePreference(newMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FeedbackProvider>
        <BrowserRouter>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header toggleTheme={toggleTheme} isDarkMode={mode === 'dark'} />
            <Container component="main" sx={{ flexGrow: 1, py: 3, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', maxWidth: 'lg' }}>
                <AppRoutes />
              </Box>
            </Container>
          </Box>
        </BrowserRouter>
      </FeedbackProvider>
    </ThemeProvider>
  );
}

export default App;