import styled from 'styled-components';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

function SearchBox() {
  const handleChange = () => {};
  const handleKeyEnter = () => {};
  const handleClick = () => {};

  return (
    <SearchBoxStyle>
      <SearchInput onChange={handleChange} onKeyDown={handleKeyEnter} />
      <SearchButton onClick={handleClick} />
    </SearchBoxStyle>
  );
}

const SearchBoxStyle = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px;
`;

export default SearchBox;
