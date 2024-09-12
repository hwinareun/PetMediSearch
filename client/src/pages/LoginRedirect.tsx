import styled from 'styled-components';
import Loading from '../components/common/Loading';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function LoginRedirectKakao() {
  const navigate = useNavigate();
  // 인가코드 가져오기
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: 'GET',
        url: `${import.meta.env.VITE_REDIRECT_URL}/?code=${code}`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8', //json형태로 데이터를 보내겠다는 의미
        },
      }).then((res) => {
        console.log(res);
        navigate('/'); // 로그인 성공 시 메인 페이지로 이동
      });
    };
    kakaoLogin();
  }, []);

  return (
    <LoginRedirectKakaoStyle>
      <Loading />
      <p>로그인 중입니다.</p>
      <p>잠시만 기다려주세요.</p>
    </LoginRedirectKakaoStyle>
  );
}

const LoginRedirectKakaoStyle = styled.div``;

export default LoginRedirectKakao;
