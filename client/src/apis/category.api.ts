import axios from 'axios';
import { Category } from '../types/post.type';

// const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCategory = async () => {
  const response = await axios.get<Category[]>(`/requestapi/category`);
  return response.data;
};
