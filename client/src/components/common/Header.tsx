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
  padding-top: 10px;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: solid;

  img {
    width: 60px;
    padding: 10px;
  }
`;

export default Header;
