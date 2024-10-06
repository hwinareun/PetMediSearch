import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
});

// 요청 추가
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
