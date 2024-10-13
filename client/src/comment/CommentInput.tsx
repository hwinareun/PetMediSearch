// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
// import CheckModal from '../modal/CheckModal';
// import { addComment } from '../apis/Comment.api';
// import { PostState } from '../types/post.type';
// import axios from 'axios';

// export default function CommentInput() {
//   // const user = useSelector()
//   const [commentText, setCommentText] = useState<string>('');
//   const [checkViewModal, setCheckViewModal] = useState(false);

//   const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setCommentText(e.target.value);
//   };

//   const handleSubmitButtonClick = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();
//     // 내용
//     if (!commentText.trim() || commentText === null) {
//       setCheckViewModal(true);
//       return;
//     } else {
//      await axios.addComment(, {
//         contents: content,
//       });
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };

//   return (
//     <>
//       {checkViewModal ? (
//         <CheckModal setCheckViewModal={setCheckViewModal} />
//       ) : null}
//       <Container>
//         <CommentForm onSubmit={handleSubmitButtonClick}>
//           <CommentText
//             placeholder="댓글을 입력 해주세요."
//             onChange={handleChangeComment}
//             value={commentText}
//             cols={30}
//             wrap="hard"
//           />
//           <CommentSubmitButtonContainer>
//             <CommentSubmitButton>등록</CommentSubmitButton>
//           </CommentSubmitButtonContainer>
//         </CommentForm>
//       </Container>
//     </>
//   );
// }

// const Container = styled.div``;

// const CommentForm = styled.form``;

// const CommentText = styled.textarea``;

// const CommentSubmitButtonContainer = styled.div``;

// const CommentSubmitButton = styled.button``;
