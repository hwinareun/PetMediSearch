import { useRouteError } from 'react-router-dom';
import styled from 'styled-components';

interface RouteError {
  statusText?: string;
  message?: string;
}

function Error() {
  const error = useRouteError() as RouteError;
  return (
    <ErrorStyle>
      <img src={'../src/assets/images/Error.png'} />
      <p className="error">
        <h3>Error!</h3>
        <h6>{error.message}</h6>
      </p>
      <a href="/">메인으로 이동</a>
    </ErrorStyle>
  );
}

const ErrorStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 200px;
  }
  p {
    border-top: solid black;
    border-bottom: solid black;
    padding: 10px;
    font-size: 20px;
    text-align: center;
  }

  a {
    font-size: 10px;
    color: grey;
    text-decoration: none;
  }

  a:hover {
    color: black;
    text-decoration: none;
  }
`;

export default Error;
