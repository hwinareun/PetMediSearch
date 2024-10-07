import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthToken } from '../../types/auth.type';
import { getToken, removeToken, setToken } from '../../utils/localStorage';

const initialState: AuthState = {
  isLogin: getToken() ? true : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, { payload }: PayloadAction<AuthToken>) => {
      state.isLogin = true;
      setToken(payload.token);
    },
    setLogout: (state) => {
      state.isLogin = false;
      removeToken();
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
