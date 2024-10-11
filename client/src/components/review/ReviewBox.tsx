import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import {
  editReview,
  getReviewsByFacilityId,
  removeReview,
} from '../../apis/review.api';
import { ReviewData } from '../../types/review.type';
import Button from '../common/Button';
import { PlaceData } from '../../types/place.type';

function ReviewBox() {
  const selectedPlace = useSelector(
    (state: RootState) => state.place.selectedPlace as PlaceData
  );
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null); // 수정 중인 리뷰 ID
  const [updatedContent, setUpdatedContent] = useState(''); // 수정된 리뷰 내용
  const [updatedRating, setUpdatedRating] = useState<number>(0); // 수정된 평점

  useEffect(() => {
    if (selectedPlace) {
      getReviewsByFacilityId(selectedPlace.id)
        .then((reviews) => {
          setReviews(reviews);
          console.log(reviews);
        })
        .catch((err) => {
          console.error(`리뷰를 불러오던 중 오류 발생: ${err}`);
        });
    }
  }, [selectedPlace]);

  const handleEditReview = async (review: ReviewData) => {
    try {
      const updatedReview = await editReview(
        review.review_id,
        updatedRating || review.rating,
        updatedContent || review.review_content
      );
      alert(`리뷰가 수정되었습니다:${updatedReview}`);
      // 수정된 리뷰를 업데이트하고, 편집 상태 초기화
      setReviews((prevReviews) =>
        prevReviews.map((prev) =>
          prev.review_id === review.review_id ? updatedReview : prev
        )
      );
      setEditingReviewId(null); // 편집 모드 종료
      getReviewsByFacilityId(selectedPlace.id).then((reviews) => {
        setReviews(reviews);
        console.log(reviews);
      });
    } catch (error) {
      console.error('리뷰 수정 중 오류 발생:', error);
    }
  };

  const handleRemoveReview = async (review: ReviewData) => {
    try {
      await removeReview(review.review_id);
      alert('리뷰가 삭제되었습니다.');
      // 삭제된 리뷰를 리스트에서 제거
      setReviews((prevReviews) =>
        prevReviews.filter((prev) => prev.review_id !== review.review_id)
      );
    } catch (error) {
      console.error('리뷰 삭제 중 오류 발생:', error);
    }
  };

  const startEditing = (review: ReviewData) => {
    setEditingReviewId(review.review_id);
    setUpdatedContent(review.review_content); // 현재 리뷰 내용을 입력 필드에 미리 채움
    setUpdatedRating(review.rating); // 현재 평점을 입력 필드에 미리 채움
  };

  return (
    <ReviewBoxStyle>
      <div>
        <h2>{selectedPlace.bplcnm}에 대한 리뷰</h2>
        {reviews.length === 0 ? (
          <div>등록된 리뷰가 없습니다.</div>
        ) : (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                {editingReviewId === review.review_id ? (
                  // 수정 중일 때는 입력 필드 표시
                  <>
                    <div>
                      평점:
                      <input
                        type="number"
                        value={updatedRating}
                        onChange={(e) =>
                          setUpdatedRating(Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      리뷰:
                      <textarea
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                      />
                    </div>
                    <Button
                      size="small"
                      scheme="positive"
                      onClick={() => handleEditReview(review)}
                    >
                      수정
                    </Button>
                    <Button
                      size="small"
                      scheme="negative"
                      onClick={() => setEditingReviewId(null)}
                    >
                      취소
                    </Button>
                  </>
                ) : (
                  // 수정 중이 아닐 때는 일반 텍스트 표시
                  <>
                    <div>평점: {review.rating}</div>
                    <div>리뷰: {review.review_content}</div>
                    <div>작성자: {review.user_id}</div>
                    <div>작성일: {review.created_at}</div>
                    <div className="bttn">
                      <Button
                        size="small"
                        scheme="positive"
                        onClick={() => startEditing(review)}
                      >
                        수정
                      </Button>
                      <Button
                        size="small"
                        scheme="negative"
                        onClick={() => handleRemoveReview(review)}
                      >
                        삭제
                      </Button>
                    </div>
                  </>
                )}
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
