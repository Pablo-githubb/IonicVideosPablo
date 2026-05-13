import axios from 'axios';

// The Laravel backend URL (change if your artisan serve runs on another port)
const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json'
  }
});

// Interceptor to add the token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
