import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { PlaceData } from '../../types/place.type';
import { setSelectPlace } from '../../store/slices/placeSlice';
import PaginationComp from '../common/PaginationComp';
import { useState } from 'react';

function ReviewPlaceList() {
  const dispatch = useDispatch();
  const { searchPlaceResults } = useSelector((state: RootState) => state.place);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPlaces = searchPlaceResults.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const handleClick = (place: PlaceData) => {
    dispatch(setSelectPlace(place));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <ReviewPlaceListStyle>
      {currentPlaces.map((place, index) => (
        <div
          key={index}
          className="placeWrap"
          onClick={() => handleClick(place)}
        >
          <div className="marker">marker</div>
          <div className="info">
            <div className="title">{place.bplcnm}</div>
            <div className="address">
              <div className="rdnwhladdr">{place.rdnwhladdr}</div>
              <div className="sitewhladdr">{place.sitewhladdr}</div>
            </div>
            <div className="tel">{place.sitetel}</div>
          </div>
        </div>
      ))}
      <PaginationComp
        totalItemsCount={searchPlaceResults.length}
        itemsCountPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </ReviewPlaceListStyle>
  );
}

const ReviewPlaceListStyle = styled.div`
  .placeWrap {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 350px;
    height: 80px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #575757;
  }

  .marker {
    padding: 10px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .title {
    font-weight: bold;
  }

  .address {
    font-size: 10px;
    color: #575757;
  }

  .tel {
    font-size: 10px;
    color: #575757;
  }
`;

export default ReviewPlaceList;
