import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Comment, PostState } from '../types/post.type';
import styled from 'styled-components';
import CheckModal from '../modal/CheckModal';

function PostDetail() {
  const [post, setPost] = useState<PostState>();
  const [comments, setComments] = useState<Comment[]>();
  const [content, setContent] = useState('');
  const [checkViewModal, setCheckViewModal] = useState(false);
  const postId = useParams().id;

  const handleSubmitButtonClick = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // 내용
    if (!content.trim() || content === null) {
      setCheckViewModal(true);
      return;
    } else {
      try {
        const response = await axios.post(
          `http://localhost:8080/comments/post_id=${postId}`,
          {
            post_id: postId,
            content: content,
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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
        <PostsStyle>
          <h3 className="title">제목 : {post.title}</h3>
          <div className="author">작성자 : {post.author}</div>
          <div className="created_at">작성일 : {post.created_at}</div>

          <ContentContainer>
            <div className="content">내용 : {post.content}</div>
          </ContentContainer>
        </PostsStyle>
      ) : (
        <div>게시글이 존재하지 않습니다.</div>
      )}
      <Container>
        <CommentForm onSubmit={handleSubmitButtonClick}>
          <CommentText
            placeholder="댓글을 입력 해주세요."
            onChange={handleChangeComment}
            value={content}
            cols={30}
            wrap="hard"
          />
          <CommentSubmitButtonContainer>
            <CommentSubmitButton onClick={() => handleSubmitButtonClick}>
              등록
            </CommentSubmitButton>
          </CommentSubmitButtonContainer>
        </CommentForm>
      </Container>
      <CommentContainer>
        {comments && comments.length != 0 ? (
          comments.map((item) => (
            <div className="contents" key={item.comment_id}>
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

const PostsStyle = styled.div`
  height: 110px;
  background-color: #d9d9d9;
  .title {
    margin-left: 10px;
  }

  .author {
    margin-left: 10px;
  }

  .created_at {
    margin-left: 10px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  background-color: #d9d9d9;
  height: 70.2vh;
  display: flex;

  .content {
    padding: 10px;
    margin-left: 20px;
    margin-top: 20px;
    height: 500px;
    width: 355px;
    background-color: #f5f5f5;
  }
`;

const Container = styled.div`
  background-color: #d9d9d9;
  margin-top: 550px;
  width: 100%;
  height: 100%;
  display: flex;
`;

const CommentContainer = styled.div`
  background-color: #d9d9d9;
  height: 100%;
  width: 415px;

  .contents {
    margin-left: 10px;
  }
`;
const CommentForm = styled.form`
  width: 415px;
  margin: 0 auto;
`;

const CommentText = styled.textarea`
  width: 90%;

  margin-left: 4px;
  margin-bottom: 5px;
  padding: 16px;
  display: flex;

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
  margin-left: auto;
  margin-right: 3px;
  margin-top: 0px;

  border: 1px solid #d0d0d0;
  border-radius: 10px;

  background-color: #fff;
  color: #262b7f;

  cursor: pointer;
  &:hover {
    background-color: #yellow;
    color: #000000;
  }
`;
