import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPostMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const addPostThunk = createAsyncThunk<void, IPostMutation>('posts/addPost', async (item) => {
  const formData = new FormData();
  const keys = Object.keys(item) as (keyof IPostMutation)[];
  keys.forEach((key) => {
    const value = item[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });
  await axiosApi.post('/posts', formData);
});
