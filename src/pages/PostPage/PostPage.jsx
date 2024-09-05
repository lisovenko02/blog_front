import React, { useCallback, useEffect, useState } from 'react'
import styles from './PostPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectOnePost } from '../../redux/post/selectors'
import { getOnePost, toggleLikes } from '../../redux/post/operations'
import { NavLink, useParams } from 'react-router-dom'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { getPostComments } from '../../redux/comments/operations'
import CommentsList from '../../components/CommentsList/CommentsList'
import AddComment from '../../components/AddComment/AddComment'
import { useAuth } from '../../hooks/useAuth'

const PostPage = () => {
  const { id } = useParams()
  const post = useSelector(selectOnePost)
  const { author, authorAvatar, imgURL, likes, name, text, title } = post
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const dispatch = useDispatch()
  const { user } = useAuth()

  const fetchPost = useCallback(async () => {
    try {
      dispatch(getOnePost(id))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(id))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, id])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  useEffect(() => {
    if (post && likes) {
      setLikeCount(likes.length)
    }
  }, [post, likes])

  useEffect(() => {
    if (likes?.includes(user._id)) {
      setIsLiked(true)
    }
  }, [likes, user._id])

  const toggleLike = () => {
    dispatch(toggleLikes(id))

    if (isLiked) {
      setIsLiked(false)
      setLikeCount(likeCount - 1)
    } else {
      setIsLiked(true)
      setLikeCount(likeCount + 1)
    }
  }

  return (
    <div>
      <div className={styles.post_container}>
        <img
          className={styles.post_postImg}
          src={imgURL}
          alt="img"
          height="320px"
          width="480px"
        />
        <div className={styles.post_itemsContainer}>
          <div className={styles.post_titleContainer}>
            <h3 className={styles.post_title}>{title}</h3>
          </div>
          <div className={styles.post_textContainer}>
            <p className={styles.post_text}>{text}</p>
          </div>
          <div className={styles.post_upperContainer}></div>
          <div className={styles.post_lowerContainer}>
            <div className={styles.post_reactionContainer}>
              <button
                type="button"
                onClick={toggleLike}
                style={{
                  color: 'white',
                  background: 'inherit',
                  border: 'inherit',
                }}
              >
                {isLiked === true ? (
                  <BsHeartFill size="16px" />
                ) : (
                  <BsHeart size="16px" />
                )}{' '}
                {likeCount}
              </button>
            </div>
            <div className={styles.post_authorContainer}>
              <NavLink style={{ color: 'white' }} to={`/user/${author}`}>
                {name}
              </NavLink>
              <NavLink to={`/user/${author}`}>
                <img
                  src={authorAvatar}
                  alt="avatarImg"
                  height="40px"
                  width="40px"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.post_commentsContainer}>
        <AddComment />
        <CommentsList ownerId={author} />
      </div>
    </div>
  )
}

export default PostPage
