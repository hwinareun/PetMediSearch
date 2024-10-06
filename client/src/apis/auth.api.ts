import { httpClient } from './http';

export const socialLogin = async (socialData: {
  socialId: string;
  socialType: 'kakao' | 'naver' | 'google';
  username: string;
}) => {
  const response = await httpClient.post('/auth/social-login', socialData);
  return response.data;
};
