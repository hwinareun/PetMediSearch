import React, { useState } from 'react';
import {
  ContainerBg,
  Container,
  TellText,
  CheckButtonContainer,
  CheckButton,
} from './DeleteModal';
import { Comment } from '../types/post.type';
import axios from 'axios';

export default function EditModal({
  setEditViewModal,
  comment,
  editText,
  setEditComments,
  editComments,
  setEditText,
}: {
  setEditViewModal: React.Dispatch<React.SetStateAction<boolean>>;
  comment: Comment;
  editText: string;
  setEditComments: React.Dispatch<React.SetStateAction<Comment>>;
  editComments: Comment;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const closeModal = () => {
    setEditViewModal(false);
  };

  const [empty, setEmpty] = useState(false);

  const submitEditText = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (editText === '') {
      setEmpty(true);
      return;
    } else {
      const commentRef = //댓글 URL & id;
        await axios.put(commentRef, {
          commentText: editText,
        });
      setEditComments({ ...editComments, isEdit: false });
      setEditViewModal(false);
      setEditText('');
    }
  };

  return (
    <ContainerBg>
      {empty ? (
        <Container>
          <TellText>내용을 입력해주세요.</TellText>
          <CheckButtonContainer>
            <CheckButton onClick={closeModal}>확인</CheckButton>
          </CheckButtonContainer>
        </Container>
      ) : (
        <Container>
          <TellText>수정 하시겠습니까?</TellText>
          <CheckButtonContainer>
            <CheckButton onClick={submitEditText}>확인</CheckButton>
            <CheckButton onClick={closeModal}>취소</CheckButton>
          </CheckButtonContainer>
        </Container>
      )}
    </ContainerBg>
  );
}
