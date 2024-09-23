import React from 'react';
import styled from 'styled-components';
import { ButtonScheme, ButtonSize } from '../../style/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
}

function Button({ children, size, scheme }: Props) {
  return (
    <ButtonStyle size={size} $scheme={scheme}>
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button<
  Omit<{ size: ButtonSize; $scheme: ButtonScheme }, 'children'>
>`
  cursor: pointer;
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  color: ${({ theme, $scheme }) => theme.buttonScheme[$scheme].color};
  background-color: ${({ theme, $scheme }) =>
    theme.buttonScheme[$scheme].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  &:hover {
    background-color: ${({ theme, $scheme }) =>
      theme.buttonScheme[$scheme].hoverColor};
  }
`;

export default Button;
