import styled from 'styled-components';
import Star from '../common/Star';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Button from '../common/Button';
import { addReview } from '../../apis/review.api';
import { useState } from 'react';

function ReviewInput() {
  const selectedPlace = useSelector(
    (state: RootState) => state.place.selectedPlace
  );
  const [rating, setRating] = useState<number>(0);
  const [reviewContent, setReviewContent] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage(null);

    try {
      await addReview(1, selectedPlace.id, rating, reviewContent); // user_id는 예시로 1로 설정
      setSuccessMessage('리뷰가 성공적으로 등록되었습니다.');
      setRating(0); // 폼 초기화
      setReviewContent('');
    } catch (err) {
      console.error(`리뷰를 등록하던 중 오류 발생: ${err}`);
    }
  };

  return (
    <ReviewInputStyle>
      <div className="info">
        <div className="title">
          <div className="title">
            <div>{selectedPlace?.bplcnm}</div>
            <Star />
            <div>
              <input
                type="number"
                id="rating"
                value={rating}
                min="0"
                max="5"
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="address">{selectedPlace?.rdnwhladdr}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            id="reviewContent"
            placeholder="후기를 작성해주세요"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
        </div>
        <Button size="small" scheme="positive" onClick={() => {}}>
          등록
        </Button>
        {successMessage && <div>{successMessage}</div>}
      </form>
    </ReviewInputStyle>
  );
}

const ReviewInputStyle = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 16px;

  .info {
    display: flex;
    flex-direction: column;
    padding: 5px;
  }

  .title {
    display: flex;
    gap: 10px;
  }

  .address {
    font-size: 10px;
  }
`;

export default ReviewInput;
