import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './EditPost.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdAddCircle } from 'react-icons/io'
import { editPost, getOnePost } from '../../redux/post/operations'
import { selectOnePost } from '../../redux/post/selectors'
import * as Yup from 'yup'

const EditPost = ({ closeModal, postId }) => {
  const inputFileRef = useRef(null)
  const [postIMG, setPostIMG] = useState(null)
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const dispatch = useDispatch()
  const post = useSelector(selectOnePost)
  const [initialValues, setInitialValues] = useState({
    file: '',
    title: '',
    text: '',
  })

  const fetchPost = useCallback(async () => {
    try {
      await dispatch(getOnePost(postId))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, postId])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    if (postIMG) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCurrentImageUrl(event.target.result)
      }
      reader.readAsDataURL(postIMG)
    }
  }, [postIMG])

  useEffect(() => {
    if (post) {
      setInitialValues({
        file: '',
        title: post?.title || '',
        text: post?.text || '',
      })
    }
  }, [post])

  const handleSubmit = async (values) => {
    const { title, text } = values

    let formData = new FormData()
    formData.set('title', title)
    formData.set('text', text)
    formData.set('postIMG', postIMG)

    const updatedPost = await dispatch(editPost({ formData, postId }))

    if (updatedPost) {
      closeModal()
    }
  }

  const handleImageUpload = (event) => {
    setPostIMG(event.target.files[0])
  }

  const editPostSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, 'The title must be longer than 5 letters')
      .required('Title is required'),
    text: Yup.string()
      .test(
        'minWords',
        'The text must be longer than 10 words',
        function (value) {
          return (
            value &&
            value.split(' ').filter((word) => word.length > 0).length >= 10
          )
        }
      )
      .required('Text is required'),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editPostSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {() => (
        <Form className={styles.updatePost_form}>
          <h1>Edit Post</h1>
          <div className={styles.updatePost_imgWrap}>
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt="imgPost"
                className={styles.updatePost_postImg}
              />
            ) : (
              <img
                src={post.imgURL}
                alt="imgPost"
                className={styles.updatePost_postImg}
              />
            )}
            <button
              className={styles.updatePost_buttonAddImg}
              type="button"
              onClick={() => {
                if (inputFileRef.current) {
                  inputFileRef.current.click()
                }
              }}
            >
              <IoMdAddCircle size="28px" color="white" />
            </button>
          </div>
          <input
            type="file"
            ref={inputFileRef}
            onChange={handleImageUpload}
            hidden
          />
          <Field
            type="text"
            name="title"
            placeholder="Title"
            className={styles.updatePost_input}
          />
          <ErrorMessage
            name="title"
            component="div"
            style={{
              color: '#f02849',
              fontSize: '16px',
              lineHeight: '16px',
            }}
          />
          <Field
            as="textarea"
            type="text"
            name="text"
            placeholder="Text"
            className={styles.updatePost_textarea}
          />
          <ErrorMessage
            name="text"
            component="div"
            style={{
              color: '#f02849',
              fontSize: '16px',
              lineHeight: '16px',
            }}
          />
          <div className={styles.updatePost_buttonsWrap}>
            <button type="submit" className={styles.updatePost_submitButton}>
              Update
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditPost
