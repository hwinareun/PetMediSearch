import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Comment, PostState } from '../types/post.type';
import styled from 'styled-components';
import CheckModal from '../modal/CheckModal';

function PostDetail() {
  const [post, setPost] = useState<PostState>();
  const [comments, setComments] = useState<Comment[]>();
  const [commentText, setCommentText] = useState('');
  const [checkViewModal, setCheckViewModal] = useState(false);
  const postId = useParams().id;

  const handleSubmitButtonClick = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // 내용
    if (!commentText.trim() || commentText === null) {
      setCheckViewModal(true);
      return;
    } else {
      await axios.post(`http://localhost:8080/comment/${postId}`);
      setCommentText('');
    }
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

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
      {checkViewModal ? (
        <CheckModal setCheckViewModal={setCheckViewModal} />
      ) : null}
      <Container>
        <CommentForm onSubmit={handleSubmitButtonClick}>
          <CommentText
            placeholder="댓글을 입력 해주세요."
            onChange={handleChangeComment}
            value={commentText}
            cols={30}
            wrap="hard"
          />
          <CommentSubmitButtonContainer>
            <CommentSubmitButton>등록</CommentSubmitButton>
          </CommentSubmitButtonContainer>
        </CommentForm>
      </Container>
      <CommentContainer>
        {comments && comments.length != 0 ? (
          comments.map((item) => (
            <div key={item.comment_id}>
              <h4>{item.author}</h4>
              <p>{item.content}</p>
              <span>{new Date(item.created_at).toLocaleString()}</span>
            </div>
          ))
        ) : (
          <div>댓글이 아직 없습니다.</div>
        )}{' '}
      </CommentContainer>
    </>
  );
}

export default PostDetail;

const Container = styled.div`
  width: 90%;
  height: 20px;
  display: flex;
`;

const CommentContainer = styled.div`
  border: 0.5px solid #d0d0d0;
  margin-top: 50px;
  display: flex;
`;
const CommentForm = styled.form`
  width: 415px;
  margin: 0 auto;
`;

const CommentText = styled.textarea`
  min-height: 50px;
  width: 100%;
  height: 100%;

  margin-left: 4px;
  margin-bottom: 5px;
  padding: 16px;

  border: 0.5px solid #d0d0d0;
  border-radius: 10px;

  resize: none;

  transition-duration: 0.3s;
`;

const CommentSubmitButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CommentSubmitButton = styled.button`
  width: 50px;
  height: 30px;
  margin-left: 4px;
  margin-top: -5px;

  border: 1px solid #d0d0d0;
  border-radius: 10px;

  background-color: #fff;
  color: #262b7f;

  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
    color: #000000;
  }
`;
