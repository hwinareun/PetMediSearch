export interface ReviewData {
  id: number; // 리뷰id
  user_id: number; // 유저id
  facility_id: number; // 장소id
  rating: number; // 별점(1~5)
  review_content: string; // 후기 내용
  created_at: string; // 작성일 YY-MM-DD default current_timestamp
}
