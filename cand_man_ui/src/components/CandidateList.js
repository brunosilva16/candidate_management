import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Select, MenuItem, FormControl, InputLabel, Paper, Box, CircularProgress, Typography, Collapse, IconButton, Grid, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import moment from 'moment';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [statuses, setStatuses] = useState(['active', 'hired', 'disqualified']);
  const [jobs, setJobs] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    status: '',
    job: '',
    recruiter: '',
    client: ''
  });
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchCandidates = (filters = {}) => {
    setLoading(true);
    const params = new URLSearchParams(filters);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    api.get(`/candidates/${queryString}`)
      .then(response => setCandidates(response.data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const fetchFilterOptions = () => {
    api.get('/jobs/')
      .then(response => setJobs(response.data))
      .catch(error => setError(error));
    api.get('/recruiters/')
      .then(response => setRecruiters(response.data))
      .catch(error => setError(error));
    api.get('/clients/')
      .then(response => setClients(response.data))
      .catch(error => setError(error));
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...selectedFilters, [filterName]: value };
    setSelectedFilters(newFilters);
    fetchCandidates(newFilters);
  };

  const handleStatusChange = (id, status) => {
    setSelectedStatus(prevState => ({
      ...prevState,
      [id]: status
    }));
  };

  const handleUpdateStatus = (id) => {
    const status = selectedStatus[id];
    api.patch(`/candidates/${id}/`, { status })
      .then(response => {
        // Refetch the candidate list to get the updated data
        fetchCandidates(selectedFilters);
        setSelectedStatus(prevState => {
          const newState = { ...prevState };
          delete newState[id];
          return newState;
        });
        setSnackbar({ open: true, message: 'Status updated successfully', severity: 'success' });
      })
      .catch(error => {
        setError(error);
        setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
      });
  };


  const clearFilters = () => {
    setSelectedFilters({ status: '', job: '', recruiter: '', client: '' });
    fetchCandidates({});
  };

  const handleExpandClick = (candidateId) => {
    setExpanded(expanded === candidateId ? null : candidateId);
  };

  const calculateAge = (birthDate) => {
    return moment().diff(moment(birthDate), 'years');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchCandidates({});
    fetchFilterOptions();
  }, []);

  return (
    <Box sx={{ padding: 1 }}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">An error occurred: {error.message}</Typography>}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Paper sx={{ padding: 2, marginBottom: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
          <SearchIcon sx={{ marginRight: 1 }} />
          <Typography variant="overline" sx={{ fontSize: "15px" }}>SEARCH:</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl variant="standard" sx={{ marginRight: 2, minWidth: 120 }}>
            <InputLabel id="job-label">Job</InputLabel>
            <Select
              labelId="job-label"
              id="job-select"
              value={selectedFilters.job}
              onChange={(e) => handleFilterChange('job', e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {jobs.map(job => (
                <MenuItem key={job.id} value={job.id}>{job.title}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ marginRight: 2, minWidth: 120 }}>
            <InputLabel id="client-label">Client</InputLabel>
            <Select
              labelId="client-label"
              id="client-select"
              value={selectedFilters.client}
              onChange={(e) => handleFilterChange('client', e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {clients.map(client => (
                <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ marginRight: 2, minWidth: 120 }}>
            <InputLabel id="recruiter-label">Recruiter</InputLabel>
            <Select
              labelId="recruiter-label"
              id="recruiter-select"
              value={selectedFilters.recruiter}
              onChange={(e) => handleFilterChange('recruiter', e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {recruiters.map(recruiter => (
                <MenuItem key={recruiter.id} value={recruiter.id}>{recruiter.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ marginRight: 2, minWidth: 120 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              value={selectedFilters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {statuses.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button sx={{ marginTop: 1.5 }} variant="outlined" onClick={clearFilters}>Clear Filters</Button>
        </Box>
      </Paper>

      <Paper sx={{ padding: 2, border: '1px solid #ccc' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Recruiter</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map(candidate => (
              <React.Fragment key={candidate.id}>
                <TableRow>
                  <TableCell>
                      <Typography>{candidate.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{candidate.job.title}</Typography>
                  </TableCell>
                  <TableCell>{candidate.job.client.name}</TableCell>
                  <TableCell>{candidate.recruiter.name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControl sx={{ minWidth: 130 }}>
                        <Select
                          value={selectedStatus[candidate.id] || candidate.status}
                          onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                          sx={{ height: '40px' }}
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="hired">Hired</MenuItem>
                          <MenuItem value="disqualified">Disqualified</MenuItem>
                        </Select>
                      </FormControl>
                      <Button variant="contained" color="primary" onClick={() => handleUpdateStatus(candidate.id)} sx={{ marginLeft: 1 }}>
                        Update
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleExpandClick(candidate.id)}>
                      {expanded === candidate.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={expanded === candidate.id} timeout="auto" unmountOnExit>
                      <Box marginTop={2} marginBottom={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={2.1}>
                            {candidate.birth_date && (
                              <Typography variant="body2"><strong>Age:</strong> {calculateAge(candidate.birth_date)}</Typography>
                            )}
                            {candidate.years_of_experience && (
                              <Typography variant="body2"><strong>Years of Experience:</strong> {candidate.years_of_experience}</Typography>
                            )}
                          </Grid>
                          <Grid item xs={2}>
                            <Typography variant="body2"><strong>Job Description:</strong> {candidate.job.description}</Typography>
                            <Typography variant="body2"><strong>Job Requirements:</strong> {candidate.job.requirements}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default CandidateList;
