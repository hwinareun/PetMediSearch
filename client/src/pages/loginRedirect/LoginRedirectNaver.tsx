import styled from 'styled-components';
import Loading from '../../components/common/Loading';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRedirectNaver() {
  const navigate = useNavigate();
  // 인가코드 가져오기
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REDIRECT_URL}/?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }).then((res) => {
      console.log(res);
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    });
  }, [code, navigate]);

  return (
    <LoginRedirectNaverStyle>
      <Loading />
      <p>로그인 중입니다.</p>
      <p>잠시만 기다려주세요.</p>
    </LoginRedirectNaverStyle>
  );
}

const LoginRedirectNaverStyle = styled.div``;

export default LoginRedirectNaver;
