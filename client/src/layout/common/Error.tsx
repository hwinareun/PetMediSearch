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
      <h1>Error!</h1>
      <p>{error.statusText}</p>
      <p>{error.message}</p>
    </ErrorStyle>
  );
}

const ErrorStyle = styled.div``;

export default Error;
