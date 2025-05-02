import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGlobalError, ILoginMutation, IRegisterMutation, IUser, IValidationError } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';

export interface RegisterAndLoginResponse {
  user: IUser;
  message: string;
}

export const register = createAsyncThunk<
  RegisterAndLoginResponse,
  IRegisterMutation,
  { rejectValue: IValidationError }
>('users/register', async (registerForm, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterAndLoginResponse>('/users', registerForm);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 400) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const login = createAsyncThunk<IUser, ILoginMutation, { rejectValue: IGlobalError }>(
  'users/login',
  async (loginForm, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterAndLoginResponse>('/users/sessions', loginForm);
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const logout = createAsyncThunk<void, void>('users/logout', async () => {
  await axiosApi.delete('users/sessions');
});
