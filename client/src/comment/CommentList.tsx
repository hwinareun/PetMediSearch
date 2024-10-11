import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comment } from '../types/post.type';
import { useParams } from 'react-router-dom';
import CommentItem from './CommentItem';
import Paging from './Paging';

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams();

  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(10); //페이지당 아이템 개수

  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState<Comment[]>([]);

  React.useEffect(() => {
    setCount(comments.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(comments.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, comments, postPerPage]);

  const setPage = (e: number) => {
    setCurrentpage(e);
  };

  const getTimegap = (posting: number) => {
    const msgap = Date.now() - posting;
    const minutegap = Math.floor(msgap / 60000);
    const hourgap = Math.floor(msgap / 3600000);
    const daygap = Math.floor(msgap / 86400000);
    if (msgap < 0) {
      return '0분전';
    }
    if (daygap > 7) {
      const time = new Date(posting);
      const timegap = time.toJSON().substring(0, 10);
      return <p>{timegap}</p>;
    }
    if (hourgap > 24) {
      return <p>{daygap}일 전</p>;
    }
    if (minutegap > 60) {
      return <p>{hourgap}시간 전</p>;
    } else {
      return <p>{minutegap}분 전</p>;
    }
  };

  return (
    <Container>
      <CommentTitle>Comments({comments.length})</CommentTitle>
      {/* 댓글들 컨테이너 */}
      <CommentsContainer>
        {currentPosts && comments.length > 0 ? (
          currentPosts.map((comment) => {
            return <CommentItem comment={comment} />;
          })
        ) : (
          <div>No Comments</div>
        )}
        <Paging page={currentpage} count={count} setPage={setPage} />
      </CommentsContainer>
    </Container>
  );
}

const Container = styled.div``;

const CommentTitle = styled.h1``;

const CommentsContainer = styled.div``;
