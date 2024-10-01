import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Lottie from 'lottie-react';
import loadingLottie from '../../assets/lottie/loadingLottie.json';

function LoginRedirectKakao() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_K_REDIRECT_URL}/?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }).then((res) => {
      console.log(res);
      navigate('/');
    });
  }, [code, navigate]);

  return (
    <LoginRedirectKakaoStyle>
      <Lottie animationData={loadingLottie} className="lottie" />
      <p>
        카카오 아이디로 간편 로그인 중입니다.
        <br />
        잠시만 기다려주세요.
      </p>
    </LoginRedirectKakaoStyle>
  );
}

const LoginRedirectKakaoStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-left: auto;
  margin-right: auto;

  .lottie {
    width: 300px;
  }
  p {
    font-size: 20px;
    text-align: center;
  }
`;

export default LoginRedirectKakao;
