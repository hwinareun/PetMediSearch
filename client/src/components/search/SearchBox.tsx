import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import { PlaceData } from '../../types/place.type';
import { useEffect, useState } from 'react';

export interface SearchProps {
  setResults: (results: PlaceData[]) => void;
}

const SearchBox = () => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    console.log('SearchBox 컴포넌트가 렌더링되었습니다.');
  }, []);

  const handleButtonClick = () => {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('입력값:', value);
    setInputValue(value);
  };

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <SearchBoxStyle>
      <Input
        name="placeName"
        type="text"
        size="small"
        placeholder="병원명 혹은 약국명을 입력해주세요"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyEnter}
      />
      <Button size="small" scheme="normal" onClick={handleButtonClick}>
        검색
      </Button>
    </SearchBoxStyle>
  );
};

const SearchBoxStyle = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px;
`;

export default SearchBox;
