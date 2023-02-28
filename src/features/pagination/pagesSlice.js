import { createSlice } from '@reduxjs/toolkit';

const pagesSlice = createSlice({
  name: 'pages',
  initialState: [],
  reducers: {
    setPages: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPages } = pagesSlice.actions;

export default pagesSlice.reducer;
