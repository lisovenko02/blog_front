import React from 'react'
import { useSelector } from 'react-redux'
import { selectPopularPosts } from '../../redux/post/selectors'
import PopularPostsItem from '../PopularPostsItem/PopularPostsItem'
import styles from './PopularPostsList.module.css'

const PopularPostsList = () => {
  const popularPosts = useSelector(selectPopularPosts)

  return (
    <div className={styles.PopularPostsList_container}>
      <h3 className={styles.PopularPostsList_title}>Popular Posts</h3>
      <ul>
        {popularPosts?.map((post, idx) => (
          <PopularPostsItem key={idx} post={post} />
        ))}
      </ul>
    </div>
  )
}

export default PopularPostsList
