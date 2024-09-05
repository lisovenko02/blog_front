import { createSlice } from '@reduxjs/toolkit'
import { addToPostComment, deleteComment, getPostComments } from './operations'

const handlePending = (state) => {
  state.isLoading = true
}

const handleRejected = (state, action) => {
  state.isLoading = false
  state.error = action.payload
}

const initialState = {
  comments: [],
  isLoading: false,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder
      // Get Comments in Post
      .addCase(getPostComments.pending, handlePending)
      .addCase(getPostComments.fulfilled, (state, { payload }) => {
        state.comments = payload
        state.isLoading = false
      })
      .addCase(getPostComments.rejected, handleRejected)
      // add Comment
      .addCase(addToPostComment.pending, handlePending)
      .addCase(addToPostComment.fulfilled, (state, { payload }) => {
        state.comments.push(payload)
        state.isLoading = false
      })
      .addCase(addToPostComment.rejected, handleRejected)
      // delete comment
      .addCase(deleteComment.pending, handlePending)
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== payload._id
        )
      })
      .addCase(deleteComment.rejected, handleRejected)
  },
})

export const commentsReducer = commentsSlice.reducer
