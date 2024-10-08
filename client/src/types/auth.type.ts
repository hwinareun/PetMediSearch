export interface AuthState {
  isLogin: boolean;
  userProfile: UserState;
}

export interface AuthToken {
  token: string;
}

export interface UserState {
  username: string;
  socialType: string;
}
