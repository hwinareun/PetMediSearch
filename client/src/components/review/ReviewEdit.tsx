import { useState } from 'react';
import { ReviewData } from '../../types/review.type';
import Button from '../common/Button';
import styled from 'styled-components';
import Star from '../common/Star';

interface EditReviewFormProps {
  review: ReviewData;
  onEdit: (
    reviewId: number,
    updatedRating: number,
    updatedContent: string
  ) => void;
  onCancel: () => void;
}

function EditReviewForm({ review, onEdit, onCancel }: EditReviewFormProps) {
  const [updatedRating, setUpdatedRating] = useState<number>(review.rating);
  const [updatedContent, setUpdatedContent] = useState<string>(
    review.review_content
  );

  const handleEdit = () => {
    onEdit(review.review_id, updatedRating, updatedContent);
  };

  return (
    <EditReviewFormStyle>
      <div className="rating">
        <Star
          setClickRating={setUpdatedRating}
          rating={updatedRating}
          interactive={true}
        />
      </div>
      <div className="content">
        리뷰:
        <textarea
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
      </div>
      <div className="bttn">
        <Button size="small" scheme="positive" onClick={handleEdit}>
          수정
        </Button>
        <Button size="small" scheme="negative" onClick={onCancel}>
          취소
        </Button>
      </div>
    </EditReviewFormStyle>
  );
}

const EditReviewFormStyle = styled.div``;

export default EditReviewForm;
