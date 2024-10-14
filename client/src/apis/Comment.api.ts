import { PostState } from '../types/post.type';
import { httpClient } from './http';

export const addComment = async (
  userId: number,
  post_id: number,
  content: string
) => {
  try {
    const response = await httpClient.post(`/comments`, {
      user_id: userId,
      post_id: post_id,
      content: content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async (post_id: number, content: string) => {
  try {
    const response = await httpClient.post(`/comments/${post_id}`, {
      content: content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editComment = async (comment_id: number, content: string) => {
  try {
    const response = await httpClient.put(`/comments/${comment_id}`, {
      content: content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
