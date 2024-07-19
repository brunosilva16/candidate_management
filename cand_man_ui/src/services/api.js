import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: baseURL,
});

const fetchToken = async () => {
  const username = process.env.REACT_APP_API_USERNAME;
  const password = process.env.REACT_APP_API_PASSWORD;

  try {
    const response = await axios.post(`${baseURL}/token/`, {
      username,
      password,
    });
    const { access } = response.data;
    // Set cookie to expire in 1 hour
    Cookies.set('token', access, { expires: 1/24 }); 
    return access;
  } catch (error) {
    console.error('Error fetching token', error);
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    let token = Cookies.get('token');
    if (!token) {
      token = await fetchToken();
    } 
    // else {
    //   console.log('Token found in cookies:', token);
    // }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
