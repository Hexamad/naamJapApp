import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Box, 
  CircularProgress,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

function ProgressDashboard() {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Initial fetch
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      // Transform data for easy access
      const transformedData = data.reduce((acc, item) => {
        acc[item.mantra_name] = item;
        return acc;
      }, {});

      setProgressData(transformedData);
      
      // Set up real-time subscription
      const channel = supabase
        .channel('progress_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'progress',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            setProgressData(current => ({
              ...current,
              [payload.new.mantra_name]: payload.new
            }));
          }
        )
        .subscribe();

      setLoading(false);

      // Cleanup subscription
      return () => {
        channel.unsubscribe();
      };
    } catch (error) {
      console.error('Error fetching progress:', error);
      setLoading(false);
    }
  };

  const calculateCompletions = (count) => {
    return Math.floor(count / 108);
  };

  const getProgressColor = (completions) => {
    if (completions >= 10) return '#4caf50';
    if (completions >= 5) return '#ff9800';
    return '#2196f3';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center"
          sx={{ 
            color: '#ff9100',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          Naam Jap Progress
        </Typography>

        <Grid container spacing={3}>
          {progressData && Object.entries(progressData).map(([mantraName, data]) => {
            const completions = calculateCompletions(data.count);
            const remainingCount = data.count % 108;
            
            return (
              <Grid item xs={12} sm={6} key={mantraName}>
                <Card 
                  elevation={3}
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {mantraName}
                    </Typography>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress
                        variant="determinate"
                        value={(remainingCount / 108) * 100}
                        size={80}
                        sx={{ color: getProgressColor(completions) }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="caption" component="div" color="text.secondary">
                          {remainingCount}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Total Completions: {completions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Count: {data.count}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/naamjap')}
            sx={{ 
              bgcolor: '#ff9100',
              '&:hover': {
                bgcolor: '#ff6d00'
              }
            }}
          >
            Continue Naam Jap
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProgressDashboard;