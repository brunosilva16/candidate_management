import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const Home = () => (
  <Container sx={{ padding: 5 }}>
    <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to Candidate Management System
        </Typography>
        <Typography variant="h6" align="center">
          Manage your candidates efficiently and effectively.
        </Typography>
      </Paper>
  </Container>
);

export default Home;
