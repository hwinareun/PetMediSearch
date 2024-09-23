import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchPlaceItem,
  setSearchPlaceResults,
} from '../../store/slices/placeSlice';
import { RootState } from '../../store';
import Input from '../common/Input';
import Button from '../common/Button';
import { PlaceData } from '../../types/place.type';
import { fetchPlaces } from '../../apis/place.api';

export interface SearchProps {
  setResults: (results: PlaceData[]) => void;
}

const SearchBox: React.FC<SearchProps> = ({ setResults }) => {
  const dispatch = useDispatch();
  const { searchPlaceItem } = useSelector((state: RootState) => state.petPlace);

  const handleButtonClick = async () => {
    if (!searchPlaceItem) {
      alert('검색어를 입력해주세요!');
      return;
    }
    console.log('검색어:', searchPlaceItem);

    setResults([]); // 검색 전 결과 초기화
    try {
      // API fetchPlaces에 전달할 객체 구성
      const searchParams = {
        placeLocation: '',
        placeName: searchPlaceItem,
      };
      console.log('API 호출 전 searchParams:', searchParams);
      const data = await fetchPlaces(searchParams); // API 호출로 장소 검색
      console.log('검색 결과 데이터:', data);

      // 결과를 Redux 상태 및 부모 컴포넌트에 저장
      dispatch(setSearchPlaceResults(data)); // 검색 결과를 상태로 저장
      setResults(data); // 부모 컴포넌트로 결과 전달
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('입력값 변경:', e.target.value);
    dispatch(setSearchPlaceItem(e.target.value)); // 입력한 값을 상태에 반영
  };

  // Enter 키 누를 때 검색 실행
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <SearchBoxStyle>
      <Input
        type="text"
        size="medium"
        value={searchPlaceItem}
        placeholder="병원명 혹은 약국명을 입력해주세요"
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
  padding: 5px;
`;

export default SearchBox;
