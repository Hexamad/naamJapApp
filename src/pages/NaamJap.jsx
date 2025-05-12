import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Button, Grid } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
// Remove this line since we're not using it anymore
// import { progress } from '../services/api';
import { supabase } from '../services/supabase';

function NaamJap() {
  const navigate = useNavigate();  // Add this line at the top
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
    let timeoutId;
    const saveProgress = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('User authentication error:', {
            error: userError,
            message: userError.message,
            status: userError.status
          });
          return;
        }

        if (!user) {
          throw new Error('No authenticated user found');
        }

        // Log the data being sent
        console.log('Attempting to save progress:', {
          user_id: user.id,
          mantra_name: mantraText,
          count: count
        });

        const { data, error } = await supabase
          .from('progress')
          .upsert({
            user_id: user.id,
            mantra_name: mantraText,
            count: count,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,mantra_name',
            returning: 'minimal' // Add this for better performance
          });

        if (error) {
          console.error('Supabase upsert error:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
            status: error?.status || 'unknown',
            statusText: error?.statusText || 'unknown'
          });
          throw error;
        }

        console.log('Progress saved successfully');
      } catch (error) {
        console.error('Failed to save progress:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
          status: error?.status,
          response: error?.response,
          request: error?.request
        });
      }
    };

    if (count > 0) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(saveProgress, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [count, mantraText]);

  const handlePause = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('User authentication error:', userError);
        return;
      }

      if (!user) {
        throw new Error('No authenticated user found');
      }

      const { data, error } = await supabase
        .from('progress')
        .upsert({
          user_id: user.id,
          mantra_name: mantraText,
          count: count,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,mantra_name'
        });

      if (error) {
        console.error('Supabase upsert error:', {
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      setIsPaused(true);
      navigate('/progress');
    } catch (error) {
      console.error('Failed to save progress:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        details: JSON.stringify(error, null, 2)
      });
    }
  };

  const handleChangeMantra = () => {
    navigate('/select-language');
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ 
        position: 'absolute',
        top: 16,
        right: 16,
      }}>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{
            bgcolor: '#ff9100',
            '&:hover': {
              bgcolor: '#ff6d00'
            }
          }}
        >
          Home
        </Button>
      </Box>
      <Box sx={{ py: { xs: 2, sm: 4 }, mt: { xs: 4, sm: 6 } }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center"
          sx={{ 
            color: '#ff9100',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            mb: { xs: 1, sm: 2 }  // Reduced bottom margin
          }}
        >
          Ichapurti Shani Mandir
        </Typography>
        <Typography 
          variant="h6" 
          gutterBottom 
          align="center" 
          sx={{ 
            color: '#000000',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          Shree Shani Shingnapur Maharaj Mandir, Nallasopara West
        </Typography>

        <Paper 
          sx={{ 
            p: { xs: 2, sm: 4 }, 
            mt: { xs: 2, sm: 4 }, 
            textAlign: 'center',
            filter: `brightness(${Math.min(brightness, 2)})`
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
          >
            Progress: {count}/108
          </Typography>

          <Typography 
            variant="h3" 
            sx={{ 
              letterSpacing: 2,
              my: { xs: 2, sm: 4 },
              fontFamily: 'serif',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
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

          <Grid 
            container 
            spacing={1} 
            sx={{ 
              maxWidth: '100%', 
              mx: 'auto',
              mt: { xs: 1, sm: 2 }
            }}
          >
            {uniqueChars.map((char) => (
              <Grid item xs={4} sm={3} key={char}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleKeyPress(char)}
                  sx={{
                    height: { xs: 48, sm: 56 },
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    minWidth: { xs: 48, sm: 56 },
                    p: { xs: 1, sm: 2 },
                    touchAction: 'manipulation'
                  }}
                >
                  {char.toUpperCase()}
                </Button>
              </Grid>
            ))}
          </Grid>

          {count >= 108 && (
            <Typography 
              variant="h6" 
              sx={{ 
                mt: { xs: 2, sm: 4 }, 
                color: 'success.main',
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              Congratulations! You've completed 108 repetitions!
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 3 } }}>
            <Button
              variant="outlined"
              onClick={handlePause}
              sx={{ 
                height: { xs: 48, sm: 56 },
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
              fullWidth
            >
              Pause & Save Progress
            </Button>
            <Button
              variant="contained"
              onClick={handleChangeMantra}
              sx={{ 
                height: { xs: 48, sm: 56 },
                fontSize: { xs: '1rem', sm: '1.25rem' },
                bgcolor: '#ff9100',
                '&:hover': {
                  bgcolor: '#ff6d00'
                }
              }}
              fullWidth
            >
              Change Mantra
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default NaamJap;