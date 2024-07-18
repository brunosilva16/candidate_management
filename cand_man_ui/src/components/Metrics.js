import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Grid, Paper, Typography, Box } from '@mui/material';

const Metrics = () => {
  const [metrics, setMetrics] = useState({ open_jobs: 0, active_candidates: 0, disqualified_candidates: 0, hired_candidates: 0 });

  useEffect(() => {
    api.get('candidates/metrics/')
      .then(response => setMetrics(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Box sx={{ padding: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Open Positions</Typography>
            <Typography variant="h4">{metrics.open_jobs}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Active Candidates</Typography>
            <Typography variant="h4">{metrics.active_candidates}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Disqualified Candidates</Typography>
            <Typography variant="h4">{metrics.disqualified_candidates}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Hired Candidates</Typography>
            <Typography variant="h4">{metrics.hired_candidates}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Metrics;
