import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import { PlaceData } from '../../types/place.type';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setSearchInputPlace } from '../../store/slices/placeSlice';
import { fetchPlaces } from '../../apis/place.api';

interface Props {
  setResults: (results: PlaceData[]) => void;
}

const SearchBox: React.FC<Props> = ({ setResults }) => {
  const dispatch = useDispatch();
  const { searchInputPlace } = useSelector(
    (state: RootState) => state.petPlace
  );

  useEffect(() => {}, [searchInputPlace]);

  const handleButtonClick = async () => {
    try {
      const results = await fetchPlaces({
        bplcnm: searchInputPlace,
      });
      setResults(results);
      console.log('click', searchInputPlace);
    } catch (error) {
      console.error('Failed to fetch places:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchInputPlace(value));
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
        size="medium"
        placeholder="병원명 혹은 약국명을 입력해주세요"
        value={searchInputPlace}
        onChange={handleInputChange}
        onKeyDown={handleKeyEnter}
      />
      <Button size="medium" scheme="normal" onClick={handleButtonClick}>
        검색
      </Button>
    </SearchBoxStyle>
  );
};

const SearchBoxStyle = styled.div`
  display: flex;
  gap: 10px;
`;

export default SearchBox;
