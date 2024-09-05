import React, { useEffect, useState } from 'react'
import styles from './UserPostsItem.module.css'
import { BsFillChatDotsFill, BsHeartFill, BsHeart } from 'react-icons/bs'
import { useAuth } from '../../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { deletePost, toggleLikes } from '../../redux/post/operations'
import { NavLink } from 'react-router-dom'
import { TbHttpDelete } from 'react-icons/tb'
import Modal from '../Modal/Modal'
import EditPost from '../EditPost/EditPost'
import { LiaEditSolid } from 'react-icons/lia'

const UserPostsItem = ({ post }) => {
  const {
    imgURL,
    likes,
    text,
    title,
    comment,
    _id: postId,
    author: authorId,
  } = post
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes.length)
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const deleteHandlerClick = () => {
    dispatch(deletePost(postId))
  }

  const handleToggleSwitch = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (likes?.includes(user._id)) {
      setIsLiked(true)
    }
  }, [likes, user._id])

  const toggleLike = () => {
    dispatch(toggleLikes(post._id))

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
      <div className={styles.post_upperContainer}>
        <img
          src={imgURL}
          alt="img"
          width="400px"
          height="300px"
          className={styles.post_img}
        />
        <h3 className={styles.post_title}>{title}</h3>
      </div>
      <div className={styles.post_lowerContainer}>
        <p className={styles.post_text}>{text}</p>
        <div className={styles.post_emotionsContainer}>
          <div className={styles.post_likesCommentContainer}>
            <button
              type="button"
              onClick={toggleLike}
              className={styles.post_likes}
            >
              {isLiked === true ? (
                <BsHeartFill size="16px" />
              ) : (
                <BsHeart size="16px" />
              )}
              <span>{likeCount}</span>
            </button>
            <NavLink className={styles.post_comment} to={`/post/${postId}`}>
              <BsFillChatDotsFill size="16px" />
              <span>{comment.length}</span>
            </NavLink>
          </div>
          {user._id === authorId && (
            <div className={styles.post_authorEmotionsContainer}>
              <button
                type="button"
                onClick={handleToggleSwitch}
                className={styles.post_updateBtn}
              >
                <LiaEditSolid color="#fff" size="16px" />
              </button>
              <button
                type="button"
                onClick={deleteHandlerClick}
                className={styles.post_deleteBtn}
              >
                <TbHttpDelete color="#fff" size="16px" />
              </button>
            </div>
          )}
          {isOpen && (
            <Modal
              isOpen={isOpen}
              closeModal={handleToggleSwitch}
              children={
                <EditPost closeModal={handleToggleSwitch} postId={postId} />
              }
            />
          )}
        </div>
      </div>
    </li>
  )
}

export default UserPostsItem
