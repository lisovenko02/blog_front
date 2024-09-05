import React, { useEffect, useState } from 'react'
import styles from './PostsItem.module.css'
import { format } from 'date-fns'
import { BsFillChatDotsFill, BsHeartFill, BsHeart } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { toggleLikes } from '../../redux/post/operations'

const PostsItem = ({ post }) => {
  const {
    imgURL,
    comment,
    likes,
    text,
    createdAt,
    title,
    name: authorName,
    author: authorId,
    authorAvatar,
    _id: postId,
  } = post
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes.length)
  const { user } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLiked(likes.includes(user._id))
    setLikeCount(likes.length)
  }, [likes, user._id])

  const toggleLike = () => {
    dispatch(toggleLikes(postId))

    if (isLiked) {
      setIsLiked(false)
      setLikeCount(likeCount - 1)
    } else {
      setIsLiked(true)
      setLikeCount(likeCount + 1)
    }
  }

  return (
    <li className={styles.post_container}>
      <div className={styles.post_imgContainer}>
        <img
          src={imgURL || null}
          alt="img"
          height="320px"
          width="480px"
          className={styles.post_img}
        />
      </div>
      <div className={styles.post_itemsContainer}>
        <div className={styles.post_upperContainer}>
          <h3 className={styles.post_title}>{title}</h3>
          <div className={styles.post_authorContainer}>
            <NavLink style={{ color: 'white' }} to={`user/${authorId}`}>
              {authorName}
            </NavLink>
            <NavLink to={`user/${authorId}`}>
              <img
                src={authorAvatar}
                alt="avatarImg"
                height="40px"
                width="40px"
              />
            </NavLink>
          </div>
        </div>
        <div>
          <p className={styles.post_text}>{text}</p>
        </div>
        <div className={styles.post_reactionContainer}>
          <div className={styles.post_likesContainer}>
            <button
              type="button"
              onClick={toggleLike}
              className={styles.post_likes}
            >
              {isLiked === true ? (
                <BsHeartFill size="16px" />
              ) : (
                <BsHeart size="16px" />
              )}{' '}
              {likeCount}
            </button>
            <NavLink className={styles.post_comment} to={`post/${postId}`}>
              <BsFillChatDotsFill size="16px" /> {comment.length}
            </NavLink>
          </div>
          <p className={styles.post_createTime}>
            {format(new Date(createdAt), 'd MMM yyyy')}
          </p>
        </div>
      </div>
    </li>
  )
}

export default PostsItem
