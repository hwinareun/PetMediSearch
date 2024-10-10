import axios from 'axios';
import { Category } from '../types/type';

export const fetchCategory = async () => {
  const response = await axios.get<Category[]>('/category');
  return response.data;
};
