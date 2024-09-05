import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import styles from './AddComment.module.css'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToPostComment } from '../../redux/comments/operations'
import { GrSend } from 'react-icons/gr'

const AddComment = () => {
  const { id: postId } = useParams()
  const dispatch = useDispatch()

  const handleSubmit = ({ comment }, { resetForm }) => {
    dispatch(addToPostComment({ postId, comment }))
    resetForm()
  }

  return (
    <div>
      <Formik initialValues={{ comment: '' }} onSubmit={handleSubmit}>
        {() => (
          <Form className={styles.addComment_form}>
            <h1 className={styles.addComment_title}>Write a comment</h1>
            <div className={styles.addComment_container}>
              <Field
                className={styles.addComment_input}
                type="text"
                name="comment"
                placeholder="comment"
              />
              <ErrorMessage
                name="comment"
                component="div"
                style={{
                  color: '#f02849',
                  fontSize: '13px',
                  lineHeight: '16px',
                }}
              />
              <button className={styles.addComment_btn} type="submit">
                <GrSend size="16px" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddComment
