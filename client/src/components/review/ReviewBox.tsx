import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { getReviewsByFacilityId } from '../../apis/review.api';
import { ReviewData } from '../../types/review.type';
import Loading from '../common/Loading';

function ReviewBox() {
  const selectedPlace = useSelector(
    (state: RootState) => state.place.selectedPlace
  );
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPlace) {
      setLoading(true);
      getReviewsByFacilityId(selectedPlace.id)
        .then((reviews) => {
          setReviews(reviews);
          setLoading(false);
          console.log(reviews);
        })
        .catch((err) => {
          console.error(`리뷰를 불러오던 중 오류 발생: ${err}`);
          setLoading(false);
        });
    }
  }, [selectedPlace]);

  if (!selectedPlace) {
    return <div>리뷰를 조회할 시설을 선택해주세요.</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <ReviewBoxStyle>
      <div>
        <h2>{selectedPlace.bplcnm}에 대한 리뷰</h2>
        {reviews.length === 0 ? (
          <div>등록된 리뷰가 없습니다.</div>
        ) : (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <div>평점: {review.rating}</div>
                <div>리뷰: {review.review_content}</div>
                <div>작성일: {review.created_at}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ReviewBoxStyle>
  );
}

const ReviewBoxStyle = styled.div``;

export default ReviewBox;
