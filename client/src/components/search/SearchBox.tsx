import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';

function SearchBox() {
  const handleChange = () => {};
  const handleKeyEnter = () => {};
  const handleClick = () => {};

  return (
    <SearchBoxStyle>
      <Input
        name="searchPlaceName"
        value={''}
        placeholder="검색어를 입력해주세요"
        onChange={handleChange}
        onKeyDown={handleKeyEnter}
      />
      <Button onClick={handleClick}>검색</Button>
    </SearchBoxStyle>
  );
}

const SearchBoxStyle = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px;
`;

export default SearchBox;
