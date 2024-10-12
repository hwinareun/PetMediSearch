import { useState } from 'react';
import { ReviewData } from '../../types/review.type';
import Button from '../common/Button';

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
    <div>
      <div>
        평점:
        <input
          type="number"
          value={updatedRating}
          onChange={(e) => setUpdatedRating(Number(e.target.value))}
        />
      </div>
      <div>
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
    </div>
  );
}

export default EditReviewForm;
