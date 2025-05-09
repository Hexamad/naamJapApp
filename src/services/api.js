import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://https://ichapurtishani.netlify.app/api'  // Replace with your actual domain
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile')
};

export const progress = {
  updateProgress: (mantraData) => api.post('/progress/update', mantraData),
  getAllProgress: () => api.get('/progress/all')
};

export default api;