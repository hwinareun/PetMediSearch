import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
});
