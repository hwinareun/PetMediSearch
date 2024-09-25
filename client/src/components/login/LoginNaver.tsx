import styled from 'styled-components';
import naverbttn from '../../assets/images/login/LoginNaver.png';

const N_CLIENT_ID = import.meta.env.VITE_N_REST_API_KEY;
const N_REDIRECT_URI = import.meta.env.VITE_N_REDIRECT_URL;

const NAVER_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${N_CLIENT_ID}&redirect_uri=${N_REDIRECT_URI}&response_type=code`;

function LoginNaver() {
  return (
    <LoginNaverStyle>
      <a href={NAVER_URL}>
        <div className="naverbttn">
          <img src={naverbttn} className="icon" />
          <p className="messge">네이버 로그인</p>
        </div>
      </a>
    </LoginNaverStyle>
  );
}

const LoginNaverStyle = styled.div`
  a {
    text-decoration: none;
  }

  .naverbttn {
    width: 350px;
    background-color: #03c75a;
    border-radius: 8px;
    display: flex;
    gap: 78px;
    align-items: center;
    color: white;
    font-size: 18px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
    margin: 10px 0;
    font-family: initial;

    .icon {
      width: 50px;
      padding: 5px;
    }
  }
`;

export default LoginNaver;
