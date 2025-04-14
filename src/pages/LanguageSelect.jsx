import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const mantras = {
  'Shree Swami Samarth': {
    sanskrit: 'श्री स्वामी समर्थ',
    english: 'Shree Swami Samarth'
  },
  'Jay Shani Dev': {
    sanskrit: 'जय शनि देव',
    english: 'Jay Shani Dev'
  },
  'Jay Shree Ram': {
    sanskrit: 'जय श्री राम',
    english: 'Jay Shree Ram'
  },
  'Jay Hanuman': {
    sanskrit: 'जय हनुमान',
    english: 'Jay Hanuman'
  },
  'Om Namah Shivaay': {
    sanskrit: 'ॐ नमः शिवाय',
    english: 'Om Namah Shivaay'
  },
  'Shree Ganeshaay Namah': {
    sanskrit: 'श्री गणेशाय नमः',
    english: 'Shree Ganeshaay Namah'
  },
  'Om Dum Durgaay Namaha': {
    sanskrit: 'ॐ दुं दुर्गाय नमः',
    english: 'Om Dum Durgaay Namaha'
  },
  'Jay Maa Ambe': {
    sanskrit: 'जय माँ अम्बे',
    english: 'Jay Maa Ambe'
  },
  'Jay Mahalakshmi Maa': {
    sanskrit: 'जय महालक्ष्मी माँ',
    english: 'Jay Mahalakshmi Maa'
  },
  'Om Namo Narayanaya': {
    sanskrit: 'ॐ नमो नारायणाय',
    english: 'Om Namo Narayanaya'
  }
};

function LanguageSelect() {
  const navigate = useNavigate();
  const [selectedMantra, setSelectedMantra] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleSubmit = () => {
    if (selectedMantra && selectedLanguage) {
      localStorage.setItem('selectedMantra', mantras[selectedMantra][selectedLanguage]);
      navigate('/naamjap');
    } else {
      alert('Please select both a mantra and language');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Select Mantra & Language
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Mantra</InputLabel>
            <Select
              value={selectedMantra}
              onChange={(e) => setSelectedMantra(e.target.value)}
              label="Select Mantra"
            >
              {Object.keys(mantras).map((mantra) => (
                <MenuItem key={mantra} value={mantra}>
                  {mantra}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>Select Language</InputLabel>
            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              label="Select Language"
              disabled={!selectedMantra}
            >
              <MenuItem value="sanskrit">Sanskrit (संस्कृत)</MenuItem>
              <MenuItem value="english">English</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={!selectedMantra || !selectedLanguage}
            sx={{ height: 56 }}
          >
            Continue
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default LanguageSelect;