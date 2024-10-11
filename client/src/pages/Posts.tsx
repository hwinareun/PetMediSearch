import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/PostList';
import { useLocation } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  const categoryId = new URLSearchParams(location.search).get('categoryId');

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      if (categoryId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/category?category=${categoryId}`
          );
          setPosts(response.data.posts); 
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };
    fetchPostsByCategory();
  }, []); 

  return (
    <>
      <PostsStyle>
        {posts.length > 0 ? (
          <Post post={posts} />
        ) : (
          <p>게시글이 없습니다.</p> 
        )}
      </PostsStyle>
    </>
  );
}

const PostsStyle = styled.div``;

export default Posts;
