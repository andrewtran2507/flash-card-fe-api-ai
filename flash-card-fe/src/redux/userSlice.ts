import { createSlice } from '@reduxjs/toolkit';

export interface UserSliceState {
  user_name: string | null;
}
const initialState: UserSliceState = {
  user_name: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.user_name = action.payload;
    },
    logoutRedux: (state) => {
      state.user_name = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
