import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Button, Grid } from '@mui/material';

function NaamJap() {
  const [mantraText, setMantraText] = useState(localStorage.getItem('selectedMantra') || 'Shree Swami Samarth');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const [illuminatedChars, setIlluminatedChars] = useState([]);

  const handleKeyPress = (char) => {
    if (char === mantraText[currentIndex].toLowerCase()) {
      setIlluminatedChars(prev => [...prev, currentIndex]);
      
      if (currentIndex === mantraText.length - 1) {
        // Completed one repetition
        setCurrentIndex(0);
        setIlluminatedChars([]);
        setCount(prev => {
          const newCount = prev + 1;
          setBrightness(1 + (newCount * 0.1));
          return newCount;
        });
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }
  };

  // Create custom keyboard based on unique characters in mantra
  const uniqueChars = Array.from(new Set(mantraText.toLowerCase()));

  useEffect(() => {
    const savedMantra = localStorage.getItem('selectedMantra');
    if (savedMantra) {
      setMantraText(savedMantra);
    }
  }, []);

  // Add these new state declarations
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    // Load saved progress when component mounts
    const savedProgress = JSON.parse(localStorage.getItem('mantraProgress') || '{}');
    if (savedProgress[mantraText]) {
      setCount(savedProgress[mantraText]);
    }
  }, [mantraText]);

  useEffect(() => {
    // Save progress whenever count changes
    const savedProgress = JSON.parse(localStorage.getItem('mantraProgress') || '{}');
    savedProgress[mantraText] = count;
    localStorage.setItem('mantraProgress', JSON.stringify(savedProgress));
  }, [count, mantraText]);

  const handlePause = () => {
    setIsPaused(true);
    navigate('/progress');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Naam Jap Practice
        </Typography>

        <Paper 
          sx={{ 
            p: 4, 
            mt: 4, 
            textAlign: 'center',
            filter: `brightness(${Math.min(brightness, 2)})`
          }}
        >
          <Typography variant="h5" gutterBottom>
            Progress: {count}/108
          </Typography>

          <Typography 
            variant="h3" 
            sx={{ 
              letterSpacing: 2,
              my: 4,
              fontFamily: 'serif'
            }}
          >
            {mantraText.split('').map((char, index) => (
              <span
                key={index}
                style={{
                  color: illuminatedChars.includes(index) ? '#9c27b0' :
                         index === currentIndex ? '#4a148c' : 
                         'inherit',
                  textShadow: illuminatedChars.includes(index) ? '0 0 10px #9c27b0' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {char}
              </span>
            ))}
          </Typography>

          <Grid container spacing={1} sx={{ maxWidth: 400, mx: 'auto' }}>
            {uniqueChars.map((char) => (
              <Grid item xs={3} key={char}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleKeyPress(char)}
                  sx={{
                    height: 56,
                    fontSize: '1.25rem'
                  }}
                >
                  {char.toUpperCase()}
                </Button>
              </Grid>
            ))}
          </Grid>

          {count >= 108 && (
            <Typography variant="h6" sx={{ mt: 4, color: 'success.main' }}>
              Congratulations! You've completed 108 repetitions!
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default NaamJap;