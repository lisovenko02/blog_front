import { createSlice } from '@reduxjs/toolkit'
import {
  editUserProfile,
  getUser,
  logOut,
  login,
  refreshUser,
  register,
} from './operations'

const handlePending = (state) => {
  state.isLoading = true
}

const handleRejected = (state, action) => {
  state.isLoading = false
  state.error = action.payload
}

const refreshRejected = (state, action) => {
  state.isLoading = false
  state.error = action.payload
  state.isRefreshing = false
}

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  isLoggedIn: false,
  isRefreshing: false,
  userInfo: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload
        state.isLoading = false
        state.isLoggedIn = true
        state.token = payload.accessToken
      })
      .addCase(register.rejected, handleRejected)
      // login
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload
        state.isLoggedIn = true
        state.isLoading = false
        state.token = payload.accessToken
      })
      .addCase(login.rejected, handleRejected)
      // logout
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = {}
        state.isLoading = false
        state.token = null
        state.isLoggedIn = false
      })
      .addCase(logOut.rejected, handleRejected)
      // refresh
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = { ...payload }
        state.isRefreshing = false
        state.isLoggedIn = true
      })
      .addCase(refreshUser.rejected, refreshRejected)
      // getUserById
      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.userInfo = payload
        state.isLoading = false
      })
      .addCase(getUser.rejected, handleRejected)
      // edit User
      .addCase(editUserProfile.pending, handlePending)
      .addCase(editUserProfile.fulfilled, (state, { payload }) => {
        state.user = payload
        state.userInfo = { ...payload }
        state.isLoading = false
      })
  },
})

export const userReducer = userSlice.reducer
