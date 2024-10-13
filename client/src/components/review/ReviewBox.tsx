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
import Star from '../common/Star';
import Programming from '../../assets/images/Programming.png';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2); // 연도의 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월을 2자리로
  const day = date.getDate().toString().padStart(2, '0'); // 일을 2자리로
  return `${year}-${month}-${day}`;
};

function ReviewBox() {
  const selectedPlace = useSelector(
    (state: RootState) => state.place.selectedPlace as PlaceData
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentReviews = reviews.slice(indexOfFirstPost, indexOfLastPost);

  const startEditing = (review: ReviewData) => {
    setEditingReviewId(review.review_id);
  };

  const handleEditReview = async (
    reviewId: number,
    updatedRating: number,
    updatedContent: string
  ) => {
    try {
      const updatedReview = await editReview(
        reviewId,
        updatedRating,
        updatedContent
      );

      alert('리뷰가 수정되었습니다');
      setReviews((prevReviews) =>
        prevReviews.map((prev) =>
          prev.review_id === reviewId ? updatedReview : prev
        )
      );
    } catch (error) {
      console.error('리뷰 수정 중 오류 발생:', error);
    }
  };

  const handleRemoveReview = async (review: ReviewData) => {
    try {
      await removeReview(review.review_id);
      alert('리뷰가 삭제되었습니다.');
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
          setReviews(reviews || []);
        })
        .catch((err) => {
          console.error(
            `리뷰를 불러오던 중 오류 발생, 해당하는 리뷰가 존재하는지 확인하세요: ${err}`
          );
          setReviews([]);
        });
    }
  }, [selectedPlace]);

  return (
    <ReviewBoxStyle>
      <div>
        {reviews.length === 0 ? (
          <div className="noResults">
            <img src={Programming} />
            <p>등록된 리뷰가 없습니다.</p>
          </div>
        ) : (
          <>
            <ul className="reviews">
              {currentReviews.map((review, index) => (
                <React.Fragment key={index}>
                  <li
                    className="review"
                    onClick={() => handleClickReview(review.review_id)}
                  >
                    <Star rating={review.rating} interactive={false} />
                    <p>작성자 번호: {review.user_id}</p>
                    <p>작성 일자: {formatDate(review.created_at)}</p>
                  </li>
                  {selectedReviewId === review.review_id && (
                    <li className="reviewDetail">
                      {editingReviewId === review.review_id ? (
                        <ReviewEdit
                          review={review}
                          onEdit={handleEditReview}
                          onCancel={() => setEditingReviewId(null)}
                        />
                      ) : (
                        <>
                          <div className="detailInfo">
                            <p className="createdAt">
                              작성 일시: {review.created_at}
                            </p>
                            {review.user_id === user.id ? (
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
                            ) : null}
                          </div>
                          <div className="content">{review.review_content}</div>
                        </>
                      )}
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
            <PaginationComp
              totalItemsCount={reviews.length}
              itemsCountPerPage={postsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </ReviewBoxStyle>
  );
}

export const ReviewBoxStyle = styled.div`
  .reviews {
    padding: 0;
  }

  .review {
    background-color: #f5f5f5;
    border-bottom: 1px solid #575757;
    padding: 1px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition: 0.5s background-color;

    &:hover {
      background-color: #c3c3c3;
    }

    p {
      padding: 0px 5px;
      border-left: 1px solid #575757;
    }
  }

  .reviewDetail {
    background-color: #d9d9d9;
    border-bottom: 1px solid #575757;
    font-size: 12px;
    padding: 8px 13px;
  }

  .detailInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 5px;
  }

  .content {
    width: 300px;
    height: 60px;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    resize: none;
    font-size: 10px;
    color: #333;
    background-color: #f5f5f5;
    overflow-y: auto;
  }

  .bttn {
    display: flex;
    justify-content: end;
    gap: 5px;
  }

  .noResults {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;

    img {
      width: 200px;
    }
    p {
      border-top: solid black;
      border-bottom: solid black;
      padding: 10px;
      font-size: 20px;
    }
  }
`;

export default ReviewBox;
