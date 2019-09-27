import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.108:55354/',
});

export default api;