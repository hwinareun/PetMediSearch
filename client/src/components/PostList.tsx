import React from 'react';
import { PostState } from '../types/type';

interface Props {
  post: PostState[];
}

const Post = ({ post }: Props) => {
  return (
    <>
      <div>
        {post.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))}
      </div>
    </>
  );
};
export default Post;
