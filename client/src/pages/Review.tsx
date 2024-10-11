import styled from 'styled-components';
import SearchBox from '../components/search/SearchBox'; // 검색박스
import ReviewInput from '../components/review/ReviewInput'; // 후기 작성 박스
import ReviewBox from '../components/review/ReviewBox'; // 해당 시설 후기들 조회 박스
import ReviewPlaceList from '../components/review/ReviewPlaceList'; // 검색 후 조회 될 시설 리스트
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { PlaceData } from '../types/place.type';

function Review() {
  const selectedPlace = useSelector(
    (state: RootState) => state.place.selectedPlace as PlaceData
  );
  const user = useSelector((state: RootState) => state.auth.userProfile);

  return (
    <ReviewStyle>
      <SearchBox />
      {user.username ? user.username : 'none'}
      <div className="review">
        {selectedPlace && selectedPlace.id ? (
          <>
            <ReviewInput />
            <ReviewBox />
          </>
        ) : (
          <ReviewPlaceList />
        )}
      </div>
    </ReviewStyle>
  );
}

const ReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 30px 30px 30px;
  align-items: center;
  gap: 20px;

  .review {
    height: 400px;
  }
`;

export default Review;
