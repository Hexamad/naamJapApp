import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Button, CircularProgress } from '@mui/material';

function UserDashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(0);

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Welcome to Naam Jap
        </Typography>

        <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
            <CircularProgress
              variant="determinate"
              value={(progress / 108) * 100}
              size={120}
              thickness={4}
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
              <Typography variant="h6" component="div" color="text.secondary">
                {progress}/108
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Your Progress
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Continue your spiritual journey with Naam Jap meditation
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/naam-jap')}
            sx={{ mt: 2 }}
          >
            Start Naam Jap
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default UserDashboard;