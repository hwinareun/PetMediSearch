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
import PaginationComp from '../common/PaginationComp';
import ReviewEdit from './ReviewEdit';
import React from 'react';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2); // 연도의 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월을 2자리로
  const day = date.getDate().toString().padStart(2, '0'); // 일을 2자리로
  return `${year}.${month}.${day}`;
};

function ReviewBox() {
  const selectedPlace = useSelector(
    (state: RootState) => state.place.selectedPlace as PlaceData
  );
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null); // 수정 중인 리뷰 ID
  const [updatedContent, setUpdatedContent] = useState(''); // 수정된 리뷰 내용
  const [updatedRating, setUpdatedRating] = useState<number>(0); // 수정된 평점

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentReviews = reviews.slice(indexOfFirstPost, indexOfLastPost);

  const startEditing = (review: ReviewData) => {
    setEditingReviewId(review.review_id);
    setUpdatedContent(review.review_content); // 현재 리뷰 내용을 입력 필드에 미리 채움
    setUpdatedRating(review.rating); // 현재 평점을 입력 필드에 미리 채움
  };

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  const handleClickReview = (reviewId: number) => {
    setSelectedReviewId((prevId) => (prevId === reviewId ? null : reviewId));
  };

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

  return (
    <ReviewBoxStyle>
      <div>
        <h2>{selectedPlace.bplcnm}에 대한 리뷰</h2>
        {reviews.length === 0 ? (
          <div>등록된 리뷰가 없습니다.</div>
        ) : (
          <ul className="reviews">
            {currentReviews.map((review, index) => (
              <React.Fragment key={index}>
                <li
                  className="review"
                  onClick={() => handleClickReview(review.review_id)}
                >
                  <div>
                    평점: {review.rating} | 리뷰:{' '}
                    {review.review_content.slice(0, 10)}... | 작성자:{' '}
                    {review.user_id} | 작성일: {formatDate(review.created_at)}
                  </div>
                </li>
                {selectedReviewId === review.review_id && (
                  <li className="reviewDetail">
                    {editingReviewId === review.review_id ? (
                      <ReviewEdit
                        review={review}
                        onEdit={() => handleEditReview(review)}
                        onCancel={() => setEditingReviewId(null)}
                      />
                    ) : (
                      <>
                        <div>
                          평점: {review.rating} | 리뷰:{review.review_content} |
                          작성자: {review.user_id} | 작성일:{review.created_at}
                        </div>
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
                )}
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>
      <PaginationComp
        totalItemsCount={reviews.length}
        itemsCountPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </ReviewBoxStyle>
  );
}

const ReviewBoxStyle = styled.div`
  .reviews {
    list-style: none;
    padding: 0;
  }

  .review {
    background-color: #f5f5f5;
    border-bottom: 1px solid #575757;
    padding: 10px;
    font-size: 12px;
    text-align: center;
  }

  .reviewDetail {
    background-color: #d9d9d9;
    border-bottom: 1px solid #575757;
    font-size: 10px;
  }

  .bttn {
    margin: 10px;
    display: flex;
    justify-content: end;
    gap: 5px;
  }
`;

export default ReviewBox;
