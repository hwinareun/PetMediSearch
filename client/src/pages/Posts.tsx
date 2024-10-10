import styled from 'styled-components';
import Programming from '../components/common/Programming';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/PostList';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/api/posts');
      setPosts(response.data);
    };
    fetchData();
  }, []);

  return (
    <PostsStyle>
      <Post post={posts} />
    </PostsStyle>
  );
}

const PostsStyle = styled.div``;

export default Posts;
