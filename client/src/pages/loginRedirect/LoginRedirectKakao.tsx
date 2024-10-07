import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Lottie from 'lottie-react';
import loadingLottie from '../../assets/lottie/loadingLottie.json';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/slices/authSlice';

function LoginRedirectKakao() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    fetch(`http://localhost:8080/auth/kakao?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          dispatch(setLogin({ token: data.token }));
          console.log('Kakao login successful:', data);
          navigate('/');
        } else {
          throw new Error('Login failed');
        }
      })
      .catch((error) => {
        console.error('Kakao login failed:', error);
        navigate('/login');
      });
  }, [code, dispatch, navigate]);

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
