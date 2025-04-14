import React, { useState } from 'react';
import { Box, Container, Typography, Paper, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';

function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 1, email: 'user@example.com', progress: 50 },
    { id: 2, email: 'user2@example.com', progress: 75 }
  ]);

  const [mantraText, setMantraText] = useState('Shree Swami Samarth');
  const [newMantraText, setNewMantraText] = useState('');

  const handleMantraUpdate = () => {
    if (newMantraText.trim()) {
      setMantraText(newMantraText);
      setNewMantraText('');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Manage Mantra Text
          </Typography>
          <Typography variant="body1" gutterBottom>
            Current Mantra: {mantraText}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="New Mantra Text"
              variant="outlined"
              value={newMantraText}
              onChange={(e) => setNewMantraText(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleMantraUpdate}
              sx={{ minWidth: 120 }}
            >
              Update
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            User Progress
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem key={user.id} divider>
                <ListItemText
                  primary={user.email}
                  secondary={`Progress: ${user.progress}/108 repetitions`}
                />
                <ListItemSecondaryAction>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      // TODO: Implement reset progress
                    }}
                  >
                    Reset Progress
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}

export default AdminDashboard;