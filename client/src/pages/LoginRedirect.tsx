import styled from 'styled-components';
import Loading from '../layout/common/Loading';

function LoginRedirectKakao() {
  return (
    <LoginRedirectKakaoStyle>
      {/* 인가코드 백으로 넘기는 로직 구현 필요 */}
      <Loading />
      <p>로그인 중입니다.</p>
      <p>잠시만 기다려주세요.</p>
    </LoginRedirectKakaoStyle>
  );
}

const LoginRedirectKakaoStyle = styled.div``;

export default LoginRedirectKakao;
