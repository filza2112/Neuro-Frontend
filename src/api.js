// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://neuro-backend-production-e950.up.railway.app/',
});

export default api;
