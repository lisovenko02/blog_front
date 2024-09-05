import { createAsyncThunk } from '@reduxjs/toolkit'
import * as API from '../services/api'
import toast from 'react-hot-toast'

export const addPost = createAsyncThunk(
  'posts/createPost',
  async (credentials, { rejectWithValue }) => {
    try {
      const resp = await API.addPost(credentials)
      toast.success('Successfully toasted!')
      return resp
    } catch (err) {
      toast.error(err.response.data.message)
      return rejectWithValue(err.message)
    }
  }
)

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await API.getAllPosts()
      return resp
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const getOnePost = createAsyncThunk(
  'posts/getOnePost',
  async (postId, { rejectWithValue }) => {
    try {
      const resp = await API.getOne(postId)
      return resp
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const getUserPosts = createAsyncThunk(
  'posts/getUserPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const resp = await API.getUserAllPosts(userId)
      return resp
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const editPost = createAsyncThunk(
  'posts/update',
  async (post, { rejectWithValue }) => {
    try {
      const resp = await API.updatePost(post)
      toast.success('Successfully updated')
      return resp
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const toggleLikes = createAsyncThunk(
  'posts/likes',
  async (postId, { rejectWithValue }) => {
    try {
      const resp = await API.likes(postId)
      return resp
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      const resp = await API.deleteOnePost(postId)
      toast.success('Successfully deleted!')
      return resp
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
