import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../../redux/post/selectors'
import PostsItem from '../PostsItem/PostsItem'
import styles from './PostsList.module.css'

const PostsList = () => {
  const postsFromRedux = useSelector(selectAllPosts)

  return (
    <ul className={styles.postList_container}>
      {postsFromRedux.length &&
        postsFromRedux.map((post, idx) => <PostsItem key={idx} post={post} />)}
    </ul>
  )
}

export default PostsList
