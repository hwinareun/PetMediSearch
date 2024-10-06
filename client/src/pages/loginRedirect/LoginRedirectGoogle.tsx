import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Lottie from 'lottie-react';
import loadingLottie from '../../assets/lottie/loadingLottie.json';

function LoginRedirectGoogle() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    fetch(`http://localhost:8080/auth/google?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Google login successful:', data);
          navigate('/');
        } else {
          throw new Error('Login failed');
        }
      })
      .catch((error) => {
        console.error('Google login failed:', error);
        navigate('/login');
      });
  }, [code, navigate]);

  return (
    <LoginRedirectGoogleStyle>
      <Lottie animationData={loadingLottie} className="lottie" />
      <p>
        구글 아이디로 간편 로그인 중입니다.
        <br />
        잠시만 기다려주세요.
      </p>
    </LoginRedirectGoogleStyle>
  );
}

const LoginRedirectGoogleStyle = styled.div`
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

export default LoginRedirectGoogle;
