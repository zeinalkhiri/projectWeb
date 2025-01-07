import { createSlice } from '@reduxjs/toolkit';
const signInSlice = createSlice({
  name: 'signIn',
  initialState: {
    isUserSignIn: false,
    usernameInput: '',
    passwordInput: '',
    username: '',
    isSignInFromOpen: false,
  },
  reducers: {
    isUserSignIn(state, action) {
      state.isUserSignIn = action.payload;
    },
    writeInUsernameInput(state, action) {
      state.usernameInput = action.payload;
    },
    writeInPasswordInput(state, action) {
      state.passwordInput = action.payload;
    },
    writeUsername(state, action) {
      state.username = action.payload;
    },
    isSignInFormOpen(state, action) {
      state.isSignInFromOpen = action.payload;
    },
  },
});
export const signInReducer = signInSlice.reducer;
export const {
  isUserSignIn,
  writeInPasswordInput,
  writeInUsernameInput,
  writeUsername,
  isSignInFormOpen,
} = signInSlice.actions;
