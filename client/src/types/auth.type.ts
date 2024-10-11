export interface AuthState {
  isLogin: boolean;
  userId: string;
  userProfile: UserState;
}

export interface UserState {
  username: string;
  socialType: string;
}
