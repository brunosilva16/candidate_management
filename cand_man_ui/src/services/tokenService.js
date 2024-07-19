import axios from 'axios';

const fetchToken = async () => {
//   const username = process.env.REACT_APP_API_USERNAME;
//   const password = process.env.REACT_APP_API_PASSWORD;
//   const baseURL = process.env.REACT_APP_API_URL;

  const baseURL = 'http://localhost:8000/api';
  const username = 'admin';
  const password = 'admin123';

  console.log('Fetching token with:', username, password, baseURL);
  
  try {
    console.log('Sending request to:', `${baseURL}/token/`);
    const response = await axios.post(`${baseURL}/token/`, {
      username,
      password,
    });
    console.log('Response received:', response);
    const { access } = response.data;
    console.log('Token:', access);
    localStorage.setItem('token', access);
    return access;
  } catch (error) {
    console.error('Error fetching token', error);
    throw error;
  }
};

export default fetchToken;
