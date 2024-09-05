import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostComments } from '../../redux/comments/selectors'
import CommentsItem from '../CommentsItem/CommentsItem'
import styles from './CommentsList.module.css'

const CommentsList = ({ ownerId }) => {
  const comments = useSelector(selectPostComments)

  return (
    <ul className={styles.comment_list}>
      {comments?.map((comment, idx) => (
        <CommentsItem key={idx} comment={comment} ownerId={ownerId} />
      ))}
    </ul>
  )
}

export default CommentsList
