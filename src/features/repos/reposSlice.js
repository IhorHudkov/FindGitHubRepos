import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

function getUrl(keyWord, page, perPage) {
  return `https://api.github.com/search/repositories?q=${keyWord}&page=${page}&per_page=${perPage}`;
}

export const getRepos = createAsyncThunk(
  'repos/getRepos',
  async ({ keyWord = 'react', page = 1, perPage = 20 }) => {
    try {
      const resp = await axios(getUrl(keyWord, page, perPage));
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    keyWord: '',
    repos: [],
    totalCount: 0,
    currentPage: 1,
    isLoading: true,
  },
  reducers: {
    setKeyWord: (state, action) => {
      state.keyWord = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRepos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRepos.fulfilled, (state, action) => {
      state.repos = action.payload.items;
      state.totalCount = action.payload.total_count;
      state.isLoading = false;
    });
    builder.addCase(getRepos.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setKeyWord, setCurrentPage } = reposSlice.actions;

export default reposSlice.reducer;
