import styled from 'styled-components';

const K_CLIENT_ID = import.meta.env.VITE_K_REST_API_KEY;
const K_REDIRECT_URI = import.meta.env.VITE_K_REDIRECT_URL;

const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_CLIENT_ID}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

function LoginKakao() {
  return (
    <LoginKakaoStyle>
      <a href={KAKAO_URL} className="kakaobttn">
        <img src={`../src/assets/images/login/KakaoLogin.png`} />
      </a>
    </LoginKakaoStyle>
  );
}

const LoginKakaoStyle = styled.div``;

export default LoginKakao;
