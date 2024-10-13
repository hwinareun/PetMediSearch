import { ReviewData } from '../types/review.type';
import { httpClient } from './http';

// 유저 ID에 따른 리뷰 조회
export const getReviewsByUserId = async () => {
  try {
    const response = await httpClient.get<ReviewData[]>(`/mypage/reviews`);
    return response.data;
  } catch (error) {
    console.error('사용자별 리뷰 조회 API 오류 발생:', error);
    throw error;
  }
};
