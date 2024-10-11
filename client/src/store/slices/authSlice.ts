import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserState } from '../../types/auth.type';
import { getToken, removeToken, setToken } from '../../utils/localStorage';

interface DecodedToken {
  userId: string;
}

const initialState: AuthState = {
  isLogin: getToken() ? true : false,
  userId: '',
  userProfile: {
    username: '',
    socialType: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (
      state,
      { payload }: PayloadAction<{ token: string; user: UserState }>
    ) => {
      state.isLogin = true;
      setToken(payload.token);
      state.userProfile = payload.user;
    },
    setLogout: (state) => {
      state.isLogin = false;
      removeToken();
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
