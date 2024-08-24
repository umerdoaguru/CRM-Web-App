import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    registerUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  }
});

export const { loginUser, logoutUser, registerUser } = authSlice.actions;
export default authSlice.reducer;
