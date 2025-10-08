import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:5002', // Changed from 5001
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
=======
  baseURL: 'http://localhost:5000/api', 
  headers: { 'Content-Type': 'application/json' },
});

export default api;
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
