import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: Props) {
  return (
    <ButtonStyle>
      <button onClick={onClick}>{children}</button>
    </ButtonStyle>
  );
}

const ButtonStyle = styled.div``;

export default Button;
