import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../types';
import { addPostThunk } from './postsThunk';

interface PostsSliceState {
  posts: IPost[] | null;
  postsLoading: boolean;
}

const initialState: PostsSliceState = {
  posts: [],
  postsLoading: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPostThunk.pending, (state) => {
        state.postsLoading = true;
      })
      .addCase(addPostThunk.fulfilled, (state) => {
        state.postsLoading = false;
      })
      .addCase(addPostThunk.rejected, (state) => {
        state.postsLoading = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    postsLoading: (state) => state.postsLoading,
  },
});

export const postsReducer = postsSlice.reducer;
export const {} = postsSlice.selectors;
