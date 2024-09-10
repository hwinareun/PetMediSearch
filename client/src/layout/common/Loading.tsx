import styled from 'styled-components';

function Loading() {
  return (
    <LoadingStyle>
      <img src={'../src/assets/images/Loading.png'} alt="Loading" />
    </LoadingStyle>
  );
}

const LoadingStyle = styled.div`
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  img {
    width: 70px;
    animation: rotate 2s linear infinite;
  }
`;

export default Loading;
