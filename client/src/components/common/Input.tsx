import styled from 'styled-components';

interface Props {
  name: string;
  value: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Input({ name, value, placeholder, onChange, onKeyDown }: Props) {
  return (
    <InputStyle>
      <input
        id="keyword"
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </InputStyle>
  );
}

const InputStyle = styled.div`
  input {
    width: 300px;
  }
`;

export default Input;
