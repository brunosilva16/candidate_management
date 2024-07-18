import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Typography, Container, Paper } from '@mui/material';

const CandidateDetails = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    api.get(`/candidates/${id}`)
      .then(response => setCandidate(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!candidate) return <div>Loading...</div>;

  return (
    <Container component={Paper} style={{ padding: '20px' }}>
      <Typography variant="h4">{candidate.name}</Typography>
      <Typography variant="h6">Position: {candidate.position}</Typography>
      <Typography variant="h6">Client: {candidate.client}</Typography>
      <Typography variant="h6">Recruiter: {candidate.recruiter}</Typography>
      <Typography variant="h6">Status: {candidate.status}</Typography>
    </Container>
  );
};

export default CandidateDetails;
