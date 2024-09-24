import styled from 'styled-components';

const G_CLIENT_ID = import.meta.env.VITE_G_REST_API_KEY;
const G_REDIRECT_URI = import.meta.env.VITE_G_REDIRECT_URL;

const Google_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${G_CLIENT_ID}&redirect_uri=${G_REDIRECT_URI}&response_type=code&scope=openid email profile`;

function LoginGoogle() {
  return (
    <LoginGoogleStyle>
      <a href={Google_URL} className="Googlebttn">
        <img src={`../src/assets/images/login/LoginGoogle.png`} />
      </a>
    </LoginGoogleStyle>
  );
}

const LoginGoogleStyle = styled.div`
  img {
    width: 350px;
    height: 70px;
  }
`;

export default LoginGoogle;
