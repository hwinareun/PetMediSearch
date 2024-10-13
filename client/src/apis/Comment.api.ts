import { httpClient } from './http';

export const addComment = async (post_id: number, content: string) => {
  try {
    const response = await httpClient.post(`/posts/${post_id}/comment`, {
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
    const response = await httpClient.post(`/posts/${post_id}/comment`, {
      contents: content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editComment = async (
  post_id: number,
  comment_id: number,
  content: string
) => {
  try {
    const response = await httpClient.put(
      `/posts/${post_id}/comment/${comment_id}`,
      {
        contents: content,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
