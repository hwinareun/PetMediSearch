import { BsFileEarmarkRichtextFill } from 'react-icons/bs';
import { FaSearchLocation } from 'react-icons/fa';
import { RiLoginBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Menu() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };
  const handlePostsClick = () => {
    navigate('/posts');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <MenuStyle>
      <nav className="menu">
        <p>
          <FaSearchLocation onClick={handleSearchClick} />
        </p>
        <p>
          <BsFileEarmarkRichtextFill onClick={handlePostsClick} />
        </p>
        {/* 로그인 기능 구현 후 마이프로필 버튼 추가*/}
        <p>
          <RiLoginBoxFill onClick={handleLoginClick} />
        </p>
      </nav>
    </MenuStyle>
  );
}

const MenuStyle = styled.div`
  .menu {
    display: flex;
    gap: 10px;

    p {
      cursor: pointer;
      font-size: 40px;
    }
  }
`;

export default Menu;
