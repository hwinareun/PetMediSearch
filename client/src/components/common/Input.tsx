import styled from 'styled-components';
import { InputSize } from '../../style/theme';
import React from 'react';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type: string;
  placeholder: string;
  size: InputSize;
}

function Input({ type, placeholder, size }: Props) {
  return <InputStyle type={type} placeholder={placeholder} size={size} />;
}

const InputStyle = styled.input<Props>`
  padding: ${({ theme, size }) => theme.input[size].padding};
  font-size: ${({ theme, size }) => theme.input[size].fontSize};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  width: ${({ theme, size }) => theme.input[size].width};
  height: ${({ theme, size }) => theme.input[size].height};
`;

export default Input;
