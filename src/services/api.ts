import axios from 'axios';

// In development, the /api proxy will route to http://localhost:8000/api
// In production, make sure to update this to your backend URL
const API_URL = import.meta.env.DEV ? '/api' : 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json'
  },
  timeout: 30000 // 30 second timeout for large file uploads
});

// Interceptor to add the token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout - file may be too large';
    }
    return Promise.reject(error);
  }
);

export default api;
