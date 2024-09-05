import { createAsyncThunk } from '@reduxjs/toolkit'
import * as API from '../services/api'

export const getPostComments = createAsyncThunk(
  'post/comments',
  async (postId, { rejectWithValue }) => {
    try {
      const resp = await API.getPostAllComments(postId)
      return resp
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const addToPostComment = createAsyncThunk(
  'post/addComment',
  async (credentials, { rejectWithValue }) => {
    try {
      const resp = await API.addComment(credentials)
      return resp
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const deleteComment = createAsyncThunk(
  'post/deleteComment',
  async (credentials, { rejectWithValue }) => {
    try {
      const resp = await API.deleteOneComment(credentials)
      return resp
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
