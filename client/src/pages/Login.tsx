import styled from 'styled-components';
import LoginKakao from '../components/login/LoginKakao';

function Login() {
  return (
    <LoginStyle>
      <LoginKakao />
    </LoginStyle>
  );
}

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export default Login;
