import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../types';
import { addPostThunk, getAllPosts } from './postsThunk';

interface PostsSliceState {
  posts: IPost[];
  postsAddLoading: boolean;
  postsFetching: boolean;
}

const initialState: PostsSliceState = {
  posts: [],
  postsAddLoading: false,
  postsFetching: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPostThunk.pending, (state) => {
        state.postsAddLoading = true;
      })
      .addCase(addPostThunk.fulfilled, (state) => {
        state.postsAddLoading = false;
      })
      .addCase(addPostThunk.rejected, (state) => {
        state.postsAddLoading = false;
      });

    builder
      .addCase(getAllPosts.pending, (state) => {
        state.postsFetching = true;
      })
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.postsFetching = false;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.postsFetching = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostAddLoading: (state) => state.postsAddLoading,
    selectPostsFetching: (state) => state.postsFetching,
  },
});

export const postsReducer = postsSlice.reducer;
export const { selectPostAddLoading, selectPosts, selectPostsFetching } = postsSlice.selectors;
