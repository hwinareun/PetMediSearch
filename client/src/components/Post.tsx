import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostState } from '../types/type';

export default function Post({ post }: { post: PostState }) {
  const navigate = useNavigate();

  return (
    <Posts
      onClick={() => {
        navigate(`/posts/${post.id}`);
      }}
    >
      <PostsTopContainer>
        <ProfileContainer>
          <ProfileNickName>{post.nickName}</ProfileNickName>
        </ProfileContainer>
        <Date>{post.created_at}</Date>
      </PostsTopContainer>
      {/* 제목, 내용 */}
      <TitleText>{post.title}</TitleText>
      <ContentText>{post.content}</ContentText>
      {/* 선택된 카테고리 */}
      <BottomCategoryContainer>
        {post.category.map((item: string) => {
          // 카테고리가 all이면 버튼보이지않게
          if (item === 'a') {
            return;
          } else {
            return (
              // eslint-disable-next-line react/jsx-key
              <BottomCategoryBt>
                {item === 'b'
                  ? 'b'
                  : item === 'c'
                    ? 'c'
                    : item === 'd'
                      ? 'd'
                      : item === 'e'
                        ? 'e'
                        : item === 'f'
                          ? 'f'
                          : ''}
              </BottomCategoryBt>
            );
          }
        })}
      </BottomCategoryContainer>
    </Posts>
  );
}
const Posts = styled.div``;

const PostsTopContainer = styled.div``;

const ProfileContainer = styled.div``;

const ProfileNickName = styled.p``;

const Date = styled.p``;

const TitleText = styled.h1``;

const ContentText = styled.p``;

const BottomCategoryContainer = styled.div``;

const BottomCategoryBt = styled.button``;
