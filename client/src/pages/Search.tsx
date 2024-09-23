import styled from 'styled-components';
import SearchBox from '../components/search/SearchBox';
import SearchMap from '../components/search/SearchMap';
import { useState } from 'react';
import { PlaceData } from '../types/place.type';

function Search() {
  //const [, setSearchPlaceResults] = useState<PlaceData[]>([]);
  return (
    <SearchStyle>
      <SearchBox />
      <SearchMap/>
    </SearchStyle>
  );
}

const SearchStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Search;
