import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Comment, PostState } from '../types/post.type';
import axios from 'axios';

export default function DeleteModal({
  setDeleteViewModal,
  comment,
  post,
}: {
  setDeleteViewModal: React.Dispatch<React.SetStateAction<boolean>>;
  comment: Comment;
  post: PostState;
}) {
  const navigate = useNavigate();
  const closeModal = () => {
    setDeleteViewModal(false);
  };

  const deleteCommentClickButton = async () => {
    axios.delete('');
    setDeleteViewModal(false);
  };

  const deletePostClickButton = async () => {
    axios.delete(`localhost:8080/api/posts/${post.id}`);
    setDeleteViewModal(false);
    navigate(`/post`);
  };

  return (
    <ContainerBg>
      <Container>
        <TellText>삭제 하시겠습니까?</TellText>
        <CheckButtonContainer>
          {comment ? (
            <CheckButton
              onClick={() => {
                deleteCommentClickButton(comment.id);
              }}
            >
              확인
            </CheckButton>
          ) : (
            <CheckButton
              onClick={() => {
                deletePostClickButton();
              }}
            >
              확인
            </CheckButton>
          )}
          <CheckButton onClick={closeModal}>취소</CheckButton>
        </CheckButtonContainer>
      </Container>
    </ContainerBg>
  );
}

export const ContainerBg = styled.div``;

export const Container = styled.div``;

export const TellText = styled.h1``;

export const CheckButtonContainer = styled.div``;

export const CheckButton = styled.button``;
