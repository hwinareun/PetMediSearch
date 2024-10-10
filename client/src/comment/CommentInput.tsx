import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import CheckModal from '../modal/CheckModal';

export default function CommentInput() {
    const {id} = useParams();
    const [commentText, setCommentText] = useState('');
    const [checkViewModal, setCheckViewModal] = useState(false);

    const newComment = {
        postId: id,
        user_id: uid,
        content: commentText,
        createdAt: Date.now(),
        isEdit: false,
      };
      const uid = //유저 인증

      const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value);
      };

      const handleSubmitButtonClick = async (
        e: React.FormEvent<HTMLFormElement>
      ) => {
        e.preventDefault();
        // 내용
        if (!commentText.trim() || commentText === null) {
          setCheckViewModal(true);
          return;
        } else {
          await axios({/*댓글 URL */}, newComment);
          setCommentText('');
        }
      };

      return (
        <>
        {checkViewModal ? (
            <CheckModal setCheckViewModal={setCheckViewModal} />
        ) : null}
        <Container>
            <CommentForm onSubmit={handleSubmitButtonClick}>
            <CommentText
                placeholder='댓글을 입력 해주세요.'
                onChange={handleChangeComment}
                value={commentText}
                cols={30}
                wrap='hard'
            />
            <CommentSubmitButtonContainer>
                <CommentSubmitButton>등록</CommentSubmitButton>
            </CommentSubmitButtonContainer>
            </CommentForm>
        </Container>
        </>
      )
    }

const Container = styled.div`
`;

const CommentForm = styled.form`

`;

const CommentText = styled.textarea`

`;

const CommentSubmitButtonContainer = styled.div`

`;

const CommentSubmitButton = styled.button`
`;