import { createSlice } from '@reduxjs/toolkit'
import {
  addPost,
  deletePost,
  editPost,
  getAllPosts,
  getOnePost,
  getUserPosts,
} from './operations'

const handlePending = (state) => {
  state.isLoading = true
}

const handleRejected = (state) => {
  state.isLoading = false
}

const initialState = {
  isLoading: false,
  posts: [],
  popularPosts: [],
  post: {},
  userPosts: [],
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder
      // Create Post
      .addCase(addPost.pending, handlePending)
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.posts.push(payload)
        state.userPosts.push(payload)
        state.popularPosts.push(payload)
      })
      .addCase(addPost.rejected, handleRejected)
      // Get All Posts
      .addCase(getAllPosts.pending, handlePending)
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.posts = payload.posts
        state.popularPosts = payload.popularPosts
      })
      .addCase(getAllPosts.rejected, handleRejected)
      // Get One Post
      .addCase(getOnePost.pending, handlePending)
      .addCase(getOnePost.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.post = payload
      })
      .addCase(getOnePost.rejected, handleRejected)
      // get All User Posts
      .addCase(getUserPosts.pending, handlePending)
      .addCase(getUserPosts.fulfilled, (state, { payload }) => {
        state.userPosts = payload
        state.isLoading = false
      })
      .addCase(getUserPosts.rejected, handleRejected)
      // edit post
      .addCase(editPost.pending, handlePending)
      .addCase(editPost.fulfilled, (state, { payload }) => {
        const updatedPost = payload
        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        )
        if (index !== -1) {
          state.posts[index] = updatedPost
        }
        const indexUser = state.userPosts.findIndex(
          (post) => post._id === updatedPost._id
        )
        if (indexUser !== -1) {
          state.userPosts[indexUser] = updatedPost
        }

        state.isLoading = false
      })
      .addCase(editPost.rejected, handleRejected)
      // delete post
      .addCase(deletePost.pending, handlePending)
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.posts = state.posts.filter((post) => post._id !== payload._id)
        state.userPosts = state.userPosts.filter(
          (post) => post._id !== payload._id
        )
        state.isLoading = false
      })
      .addCase(deletePost.rejected, handleRejected)
  },
})

export const postReducer = postSlice.reducer
