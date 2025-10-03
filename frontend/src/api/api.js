import axios from 'axios';

const API_URL = "http://localhost:4000/api"; // Backend URL

const api = axios.create({
  baseURL: API_URL,
});

// Set JWT token in headers
export const setToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;
