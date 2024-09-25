import styled from 'styled-components';
import Menu from './Menu';

function Header() {
  return (
    <HeaderStyle>
      <a href="/">
        <img src={'../src/assets/images/Icon.png'} />
      </a>
      <Menu />
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  display: flex;
  padding: 10px;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid;
  margin-bottom: 20px;

  img {
    width: 60px;
  }
`;

export default Header;
