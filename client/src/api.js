import axios from 'axios';

// Prefer explicit env, but default to backend on 5000 when running CRA dev server on 3000
const inferredBaseURL = typeof window !== 'undefined' && window.location && window.location.port === '3000'
  ? 'http://localhost:5000'
  : '';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || inferredBaseURL,
  withCredentials: false
});

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear invalid tokens
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      
      // Redirect to login page if not already there
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

