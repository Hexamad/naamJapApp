import React from 'react';
import { Box, Container, Typography, Paper, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Progress() {
  const navigate = useNavigate();
  const progress = JSON.parse(localStorage.getItem('mantraProgress') || '{}');

  const handleContinueMantra = (mantra) => {
    localStorage.setItem('selectedMantra', mantra);
    navigate('/naamjap');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Your Progress
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
          {Object.entries(progress).length > 0 ? (
            Object.entries(progress).map(([mantra, count]) => (
              <Box key={mantra} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Typography variant="h6">{mantra}</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Completed: {count}/108
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => handleContinueMantra(mantra)}
                  fullWidth
                >
                  Continue
                </Button>
              </Box>
            ))
          ) : (
            <Typography align="center" color="text.secondary">
              No mantras in progress
            </Typography>
          )}
          
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/select-language')}
            sx={{ mt: 3 }}
          >
            Start New Mantra
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Progress;