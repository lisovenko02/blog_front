import React from 'react'
import UserPostsItem from '../UserPostsItem/UserPostsItem'
import { useSelector } from 'react-redux'
import { selectUserPosts } from '../../redux/post/selectors'
import styles from './UserPostsList.module.css'
import UserWithoutPosts from '../UserWithoutPosts/UserWithoutPosts'

const UserPostsList = ({ userId }) => {
  const posts = useSelector(selectUserPosts)

  return (
    <div>
      <h2 className={styles.post_mainTitle}>User Posts</h2>
      <ul className={styles.post_listContainer}>
        {posts.length ? (
          posts?.map((post, idx) => <UserPostsItem key={idx} post={post} />)
        ) : (
          <UserWithoutPosts userId={userId} />
        )}
      </ul>
    </div>
  )
}

export default UserPostsList
