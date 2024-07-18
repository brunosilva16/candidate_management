import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="overline" sx={{ flexGrow: 1, fontSize: "20px" }} >
        CANDIDATE MANAGEMENT
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/candidates" startIcon={<PeopleIcon />}>
          Candidates
        </Button>
        <Button color="inherit" component={Link} to="/dashboard" startIcon={<AssessmentIcon />}>
          Dashboard
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
