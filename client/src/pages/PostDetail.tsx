import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Comment, PostState } from '../types/post.type';

function PostDetail() {
  const [post, setPost] = useState<PostState>();
  const [comments, setComments] = useState<Comment[]>();
  const postId = useParams().id;

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/posts/${postId}`
        );
        console.log(response);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPostById();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/comments/${postId}`
        );
        console.log(response);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, []);

  return (
    <>
      {post ? (
        <>
          <h3>제목 : {post.title}</h3>
          <div>작성자 : {post.author}</div>
          <div>작성일 : {post.created_at}</div>
          <div>내용 : {post.content}</div>
        </>
      ) : (
        <div>게시글이 존재하지 않습니다.</div>
      )}
      {comments && comments.length != 0 ? (
        comments.map((item) => (
          <div key={item.comment_id}>
            <h4>{item.username}</h4> {/* 댓글 작성자 이름 */}
            <p>{item.content}</p> {/* 댓글 내용 */}
            <span>{new Date(item.created_at).toLocaleString()}</span>{' '}
          </div>
        ))
      ) : (
        <div>댓글이 아직 없습니다.</div>
      )}{' '}
    </>
  );
}

export default PostDetail;
