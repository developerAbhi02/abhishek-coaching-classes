import axios from 'axios';

// Prefer explicit env, but default to backend on 5000 when running CRA dev server on 3000
const inferredBaseURL = typeof window !== 'undefined' && window.location && window.location.port === '3000'
  ? 'http://localhost:5000'
  : '';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || inferredBaseURL,
  withCredentials: false
});

export default api;

