import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userName: string;
  email: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userName: '',
  email: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userName = '';
      state.email = '';
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;