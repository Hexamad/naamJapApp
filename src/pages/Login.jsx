import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await auth.login(formData);
      localStorage.setItem('token', data.token);
      navigate('/select-language');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      {localStorage.getItem('token') && (
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
      )}
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
          Ichapurti Shani Mandir
        </Typography>

        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
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
              <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
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