import axios from 'axios';
import { Category } from '../types/post.type';

export const fetchCategory = async () => {
  const response = await axios.get<Category[]>('localhost:8080/category');
  return response.data;
};
