import React from 'react'
import { BsHeart } from 'react-icons/bs'
import styles from './PopularPostsItem.module.css'
import { NavLink } from 'react-router-dom'

const PopularPostsItem = ({ post }) => {
  const { title, _id: id, likes, authorAvatar } = post

  return (
    <li>
      <div className={styles.popularPosts_container}>
        <NavLink to={`post/${id}`} className={styles.popularPosts_avatarLink}>
          <img src={authorAvatar} alt={id} height="30px" width="30px" />
          <p style={{ marginRight: '8px' }}>{title}</p>
        </NavLink>
        <NavLink to={`post/${id}`} className={styles.popularPosts_postLink}>
          <BsHeart size="16px" />
          <p>{likes?.length || 0}</p>
        </NavLink>
      </div>
    </li>
  )
}

export default PopularPostsItem
