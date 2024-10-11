import React from 'react';
import { PostState } from '../types/post.type';
import { useNavigate } from 'react-router-dom';

interface Props {
  post: PostState[];
}

const Post = ({ post }: Props) => {
  const navigate = useNavigate();

  const handleTitleClick = (id: number) => {
    console.log(id);
    navigate(`/posts/${id}`);
  };

  return (
    <>
      {post.map((item) => (
        <>
          <p onClick={() => handleTitleClick(item.post_id)} key={item.post_id}>
            {item.title} {item.username}
          </p>
        </>
      ))}
    </>
  );
};
export default Post;
