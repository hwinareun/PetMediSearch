import { FaGithubSquare } from 'react-icons/fa';
import styled from 'styled-components';

function Footer() {
  const newPageGithub = () => {
    window.open('https://github.com/PetMediSearch/PetMediSearch');
  };

  return (
    <FooterStyle>
      <FaGithubSquare
        className="m-3 text-4xl rounded text-chickenMain hover:text-white hover:bg-chickenPoint"
        onClick={newPageGithub}
      />
      <p>
        ⓒ 2024. Team:PetMediSearch. <br />
        All rights reserved.
      </p>
    </FooterStyle>
  );
}

const FooterStyle = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  height: 30px;
  justify-content: space-between;
  border-top: solid;

  p {
    padding-right: 10px;
    text-align: right;
    font-size: 8px;
    font-style: italic;
    font-weight: lighter;
  }

  svg {
    padding-left: 10px;
    font-size: 30px;
  }
`;

export default Footer;
