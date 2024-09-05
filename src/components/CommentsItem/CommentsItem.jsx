import React from 'react'
import { formatDistance } from 'date-fns'
import styles from './CommentsItem.module.css'
import { NavLink, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../redux/comments/operations'
import { RiDeleteBin7Fill } from 'react-icons/ri'

const CommentsItem = ({ comment, ownerId }) => {
  const {
    comment: postComment,
    authorAvatar,
    name,
    createdAt,
    _id: commentId,
    author: authorId,
  } = comment
  const { id: postId } = useParams()
  const { user } = useAuth()
  const dispatch = useDispatch()

  const deleteHandlerClick = () => {
    dispatch(deleteComment({ postId, commentId }))
  }

  return (
    <li className={styles.comment_container}>
      <div className={styles.comment_upperContainer}>
        <div className={styles.comment_authorContainer}>
          <NavLink to={`/user/${authorId}`}>
            <img src={authorAvatar} alt="img" height="40px" width="40px" />
          </NavLink>
          <NavLink to={`/user/${authorId}`}>
            <p className={styles.comment_authorName}>{name}:</p>
          </NavLink>
          <p className={styles.comment_text}>{postComment}</p>
        </div>
        <div className={styles.comment_lowerContainer}>
          <p className={styles.comment_createDate}>
            {formatDistance(Date.now(), new Date(createdAt), {
              includeSeconds: true,
            })}{' '}
            ago
          </p>
          {(user?._id === authorId || ownerId === user?._id) && (
            <button
              type="submit"
              onClick={deleteHandlerClick}
              className={styles.comment_deleteIcn}
            >
              <RiDeleteBin7Fill color="#fff" size="16px" />
            </button>
          )}
        </div>
      </div>
    </li>
  )
}

export default CommentsItem
