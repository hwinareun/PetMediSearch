import { httpClient } from './http';

export const addComment = async (post_id: number, content: string) => {
  try {
    const response = await httpClient.post(`/comment/${post_id}`, {
      contents: content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async (post_id: number, content: string) => {
  try {
    const response = await httpClient.post(`/comment/${post_id}`, {
      contents: content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editComment = async (comment_id: number, content: string) => {
  try {
    const response = await httpClient.put(`/comment/${comment_id}`, {
      contents: content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
