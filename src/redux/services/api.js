import axios from 'axios'

// axios.defaults.baseURL = 'https://blog-back-xb5x.onrender.com';
axios.defaults.baseURL = 'http://localhost:4000'

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = ''
}

// User

export async function signUp(credentials) {
  const resp = await axios.post('users/register', credentials)
  setAuthHeader(resp.data.accessToken)
  return resp.data
}

export async function signIn(credentials) {
  const resp = await axios.post('users/login', credentials)
  setAuthHeader(resp.data.accessToken)
  return resp.data
}

export async function logOut() {
  await axios.post('users/logout')
  clearAuthHeader()
}

export async function refresh() {
  const resp = await axios.get('users/current')
  return resp.data
}

export async function getUserById(userId) {
  const resp = await axios.get(`users/${userId}`)
  return resp.data
}

export async function updateUser(credentials) {
  const resp = await axios.patch('users/update', credentials)
  return resp.data
}

// POSTS

export async function addPost(credentials) {
  const resp = await axios.post('posts', credentials)
  return resp.data
}

export async function getAllPosts() {
  const resp = await axios.get('posts')
  return resp.data
}

export async function getOne(postId) {
  const resp = await axios.get(`posts/${postId}`)
  return resp.data
}

export async function getUserAllPosts(userId) {
  const resp = await axios.get(`posts/user/${userId}`)
  return resp.data
}

export async function updatePost(post) {
  const resp = await axios.patch(`posts/${post.postId}`, post.formData)
  return resp.data
}

export async function likes(postId) {
  const resp = await axios.put(`posts/${postId}`)
  return resp.data
}

export async function deleteOnePost(postId) {
  const resp = await axios.delete(`posts/${postId}`)
  return resp.data
}

// COMMENTS

export async function getPostAllComments(postId) {
  const resp = await axios.get(`posts/comment/${postId}`)
  return resp.data
}

export async function addComment(credentials) {
  const resp = await axios.post(`comments/${credentials.postId}`, credentials)
  return resp.data
}

export async function deleteOneComment(credentials) {
  const resp = await axios.delete(
    `posts/${credentials.postId}/comment/${credentials.commentId}`,
    credentials
  )
  return resp.data
}
