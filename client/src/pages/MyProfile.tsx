import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';

function MyProfile() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <MyProfileStyle>
      <div className="userInfo">
        <p className="userType">{user.socialType}</p>
        <p className="userName">{user.username}</p>
      </div>
      <div className="userSection">
        <div className="post">
          <div className="title">
            <p>내 게시판 글 조회</p>
            <a href="/category">게시글 작성하러 가기</a>
          </div>
          <div className="table">글글글</div>
        </div>
        <div className="review">
          <div className="title">
            <p>내 후기 글 조회</p>
            <a href="/review">후기 작성하러 가기</a>
          </div>
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
    .userType {
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
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 5px;
    }
  }

  .table {
    padding: 4px;
    border: 1px solid #e3e3e3;
    border-radius: 8px;
    height: 200px;
  }
`;

export default MyProfile;
