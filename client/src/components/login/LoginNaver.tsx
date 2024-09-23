import styled from 'styled-components';

const N_CLIENT_ID = import.meta.env.VITE_N_REST_API_KEY;
const N_REDIRECT_URI = import.meta.env.VITE_N_REDIRECT_URL;

const NAVER_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${N_CLIENT_ID}&redirect_uri=${N_REDIRECT_URI}&response_type=code`;

function LoginNaver() {
  return (
    <LoginNaverStyle>
      <a href={NAVER_URL} className="naverbttn">
        <img src={`../src/assets/images/login/LoginNaver.png`} />
      </a>
    </LoginNaverStyle>
  );
}

const LoginNaverStyle = styled.div`
  img {
    width: 350px;
    height: 70px;
  }
`;

export default LoginNaver;
