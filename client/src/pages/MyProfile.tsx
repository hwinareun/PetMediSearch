import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';

function MyProfile() {
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);

  return (
    <MyProfileStyle>
      <div className="userInfo">
        <p className="userProfile"></p>
        <p className="userType">{userProfile.socialType}</p>
        <p className="userName">{userProfile.username}</p>
      </div>
      <div className="userSection">
        <div className="post">
          <p className="title">내 게시판 글 조회</p>
          <div className="table">글글글</div>
        </div>
        <div className="review">
          <p className="title">내 후기 글 조회</p>
          <div className="table">글글글</div>
        </div>
      </div>
    </MyProfileStyle>
  );
}

const MyProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 30px 30px 30px;

  .userInfo {
    display: flex;
    align-items: end;
    gap: 10px;
    .userProfile {
      width: 50px;
      height: 50px;
      border-radius: 16px;
      background-color: #e3e3e3;
    }

    .userName {
      font-size: 20px;
    }
  }

  .userSection {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .title {
    font-size: 16px;
    margin: 0;
  }

  .table {
    padding: 4px;
    border: 1px solid #e3e3e3;
    border-radius: 8px;
    height: 200px;
  }
`;

export default MyProfile;
