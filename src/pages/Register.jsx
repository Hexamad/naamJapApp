import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const { data } = await auth.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('token', data.token);
      navigate('/select-language');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
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
            Create Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              margin="normal"
              required
            />
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              Register
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Already have an account? Login
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;