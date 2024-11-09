import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import config from '../config';

const StartPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate ();

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/user/${username}`);
      localStorage.setItem('userUUID', response.data.userID)
      navigate('/documents');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Start Collaboration
      </Button>
    </Box>
  );
};

export default StartPage;
