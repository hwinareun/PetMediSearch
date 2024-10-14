import { httpClient } from './http';

export const addPosts = async (
  userId: number,
  title: string,
  content: string,
  category_id: string
) => {
  try {
    const response = await httpClient.post(`/posts`, {
      user_id: userId,
      title: title,
      content: content,
      category_id: category_id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
