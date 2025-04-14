import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Add to imports
import { Link } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const devEmail = getComputedStyle(document.documentElement).getPropertyValue('--dev-email').replace(/'/g, '').trim();
    const devPassword = getComputedStyle(document.documentElement).getPropertyValue('--dev-password').replace(/'/g, '').trim();

    // In the handleLogin function
    if (email === devEmail && password === devPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/select-language');  // Changed from '/naamjap'
    }
    else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ color: '#ff9100' }}>
            Ichapurti Shani Mandir
          </Typography>
          <Typography variant="h6" gutterBottom align="center" sx={{ color: '#000000' }}>
            Shree Shani Shingnapur Maharaj Mandir Nallasopara West
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              Login
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/register" underline="hover">
                Don't have an account? Register
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;