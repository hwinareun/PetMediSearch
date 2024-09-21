import React from 'react';
import styled from 'styled-components';
import { ButtonScheme, ButtonSize } from '../../style/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  size: ButtonSize;
  scheme: ButtonScheme;
}

function Button({ children, onClick, size, scheme }: Props) {
  return (
    <ButtonStyle size={size} scheme={scheme} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button<Omit<Props, 'children'>>`
  cursor: pointer;
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) =>
    theme.buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  &:hover {
    background-color: ${({ theme, scheme }) =>
      theme.buttonScheme[scheme].hoverColor};
  }
`;

export default Button;
