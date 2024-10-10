import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Category from '../Categorry/Category';
import CommentInput from '../comment/CommentInput';
import CommentList from '../comment/CommentList';

export default function Detail() {
  const [setDetail, getSetDetail] = useState('');
  const { id } = useParams();
  const uid = {
    /* 로그인 인증 */
  };
  const getDetail = async () => {
    // 게시글 데이터 받아오기
  };
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      <Container>
        <InnerWidth>
          <ContentsContainer>
            <ProfileContainer>
              {uid === setDetail.userId ? (
                <Button
                  location={setDetail.coord}
                  id={id}
                  delete="삭제"
                  edit="수정"
                  btnWidth={80}
                  btnHeight={40}
                ></Button>
              ) : null}
            </ProfileContainer>
            <Title>{setDetail.title}</Title>
            <Contents>{setDetail.content}</Contents>
            <Category />
          </ContentsContainer>
        </InnerWidth>
        {uid ? <CommentInput /> : undefined}
        <CommentList />
      </Container>
    </>
  );
}

const Container = styled.div``;

const InnerWidth = styled.div``;

const ContentsContainer = styled.div``;

const ProfileContainer = styled.div``;

const Title = styled.h1``;

const Contents = styled.div``;
