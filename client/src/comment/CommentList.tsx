import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comment } from '../types/post.type';
import PaginationComp from '../components/common/PaginationComp';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postId = useParams().id;

  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentComment = comments.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
    <Container>
      <CommentsContainer>
        {comments && comments.length != 0 ? (
          currentComment.map((item) => (
            <div className="contents" key={item.comment_id}>
              <h4>{item.author}</h4>
              <p>{item.content}</p>
              <span>{new Date(item.created_at).toLocaleString()}</span>
            </div>
          ))
        ) : (
          <div>댓글이 아직 없습니다.</div>
        )}{' '}
        <PaginationComp
          totalItemsCount={comments.length}
          itemsCountPerPage={postsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </CommentsContainer>
    </Container>
  );
}

const Container = styled.div``;

const CommentsContainer = styled.div``;
