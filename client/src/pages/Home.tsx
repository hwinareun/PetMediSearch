import styled from 'styled-components';
import Menu from '../components/common/Menu';

function Home() {
  return (
    <HomeStyle>
      <p>PetMediSearch</p>
      <img src={'../src/assets/images/Logo.png'} alt="Logo" />
      <nav>
        <Menu />
      </nav>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  max-width: 415px;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;

  p {
    font-style: italic;
    font-size: 30px;
    margin: 0;
  }

  img {
    width: 250px;
    margin-bottom: 20px;
  }
`;

export default Home;
