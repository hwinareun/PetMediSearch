import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/PostList';
import { useLocation } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  // 'categoryId' 쿼리 파라미터에서 가져옴 (오타 수정)
  const categoryId = new URLSearchParams(location.search).get('categoryId');

  // 카테고리 ID에 맞는 포스트 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchPostsByCategory = async () => {
      if (categoryId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/category?category=${categoryId}`
          );
          setPosts(response.data.posts); // 포스트 데이터 설정
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };
    fetchPostsByCategory();
  }, []); // categoryId가 변경될 때마다 실행

  return (
    <>
      <PostsStyle>
        {posts.length > 0 ? (
          <Post post={posts} /> // 포스트 렌더링
        ) : (
          <p>No posts available for this category.</p> // 포스트가 없을 때 메시지
        )}
      </PostsStyle>
    </>
  );
}

const PostsStyle = styled.div``;

export default Posts;
