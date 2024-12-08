import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: 2,
      }}>
      <Box sx={{ fontSize: 80, color: '#9e9e9e', marginBottom: 2 }}>😕</Box>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Упс... Сторінка, яку ви шукаєте, не існує.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        На головну
      </Button>
    </Box>
  );
};

export default Page404;
