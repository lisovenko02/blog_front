import { createAsyncThunk } from '@reduxjs/toolkit'
import * as API from '../services/api'
import toast from 'react-hot-toast'

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const resp = await API.signUp(credentials)
      return resp
    } catch (err) {
      toast.error(err.response.data.message)
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const resp = await API.signIn(credentials)
      return resp
    } catch (err) {
      toast.error(err.response.data.message)
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await API.logOut()
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    console.log(state)
    const token = state.user.token
    if (!token) {
      return thunkAPI.rejectWithValue('No valid token')
    }

    API.setAuthHeader(token)

    try {
      const resp = await API.refresh()
      console.log(resp)
      return resp
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const getUser = createAsyncThunk(
  'user/getUser',
  async (postId, thunkAPI) => {
    try {
      const resp = await API.getUserById(postId)
      return resp
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const editUserProfile = createAsyncThunk(
  'user/edit',
  async (credentials, thunkAPI) => {
    try {
      const resp = await API.updateUser(credentials)
      toast.success('Your profile has been updated')
      return resp
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)
