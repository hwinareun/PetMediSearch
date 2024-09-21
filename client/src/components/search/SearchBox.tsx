import styled from 'styled-components';
import Input from '../common/Input';
import SearchButton from './SearchButton';

function SearchBox() {
  const handleChange = () => {};
  const handleKeyEnter = () => {};

  return (
    <SearchBoxStyle>
      <Input
        name="searchPlaceName"
        value={''}
        placeholder="검색어를 입력해주세요"
        onChange={handleChange}
        onKeyDown={handleKeyEnter}
      />
      <SearchButton />
    </SearchBoxStyle>
  );
}

const SearchBoxStyle = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px;
`;

export default SearchBox;
