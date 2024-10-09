import styled from 'styled-components';
import SearchBox from '../components/search/SearchBox';
import SearchMapCopy from '../components/search/SearchMapCopy';
// import SearchMap from '../components/search/SearchMap';

function Search() {
  return (
    <SearchStyle>
      <SearchBox />
      {/* <SearchMap /> */}
      <SearchMapCopy />
    </SearchStyle>
  );
}

const SearchStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Search;
