import styled from 'styled-components';
import SearchBox from '../components/search/SearchBox';
import SearchMap from '../components/search/SearchMap';
import { useState } from 'react';
import { PlaceData } from '../types/place.type';

function Search() {
  const [searchPlaceResults, setSearchPlaceResults] = useState<PlaceData[]>([]);
  return (
    <SearchStyle>
      <SearchBox setResults={setSearchPlaceResults} />
      <SearchMap results={searchPlaceResults} />
    </SearchStyle>
  );
}

const SearchStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Search;
