import styled from 'styled-components';
import SearchBox from '../components/search/SearchBox';
import SearchMap from '../components/search/SearchMap';

function Search() {
  return (
    <SearchStyle>
      <SearchBox />
      <SearchMap />
    </SearchStyle>
  );
}

const SearchStyle = styled.div``;

export default Search;
