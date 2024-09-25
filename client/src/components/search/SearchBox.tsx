import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import { PlaceData } from '../../types/place.type';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setResults, setSearchInputPlace } from '../../store/slices/placeSlice';
import { fetchPlaces } from '../../apis/place.api';

function SearchBox() {
  const dispatch = useDispatch();
  const { searchInputPlace } = useSelector((state: RootState) => state.place);

  useEffect(() => {}, [searchInputPlace]);

  const handleButtonClick = async () => {
    try {
      // 서버에서 데이터를 받아옴
      const results = await fetchPlaces({
        bplcnm: searchInputPlace,
      });

      // 결과가 배열인지 확인
      if (!Array.isArray(results)) {
        console.error(
          '배열을 기대했으나 다른 데이터 형식이 반환되었습니다:',
          results
        );
        return;
      }

      // 입력값을 포함하는 데이터만 필터링
      const filteredResults = results.filter((place: PlaceData) => {
        const x = Number(place.x);
        const y = Number(place.y);

        return (
          !isNaN(x) &&
          !isNaN(y) &&
          isFinite(x) &&
          isFinite(y) &&
          (place.bplcnm.includes(searchInputPlace) ||
            place.sitewhladdr.includes(searchInputPlace) ||
            place.rdnwhladdr.includes(searchInputPlace))
        );
      });

      // 필터링된 결과를 리덕스 스토어에 저장
      dispatch(setResults(filteredResults));
      console.log(filteredResults);
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
        placeholder="장소명 혹은 주소지를 입력해주세요"
        value={searchInputPlace}
        onChange={handleInputChange}
        onKeyDown={handleKeyEnter}
      />
      <Button size="medium" scheme="normal" onClick={handleButtonClick}>
        검색
      </Button>
    </SearchBoxStyle>
  );
}

const SearchBoxStyle = styled.div`
  display: flex;
  gap: 10px;
`;

export default SearchBox;
