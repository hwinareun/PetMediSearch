import styled from 'styled-components';

function MyProfile() {
  return (
    <MyProfileStyle>
      <div>username</div>
      <div>
        <div>내 게시판 글 조회</div>
      </div>
      <div>
        <div>내 후기 글 조회</div>
      </div>
    </MyProfileStyle>
  );
}

const MyProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MyProfile;
