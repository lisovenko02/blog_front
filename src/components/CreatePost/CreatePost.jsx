import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import styles from './CreatePost.module.css'
import { IoMdAddCircle } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { addPost, getAllPosts } from '../../redux/post/operations'
import * as Yup from 'yup'

const CreatePost = ({ closeModal }) => {
  const inputFileRef = useRef(null)
  const [postIMG, setPostIMG] = useState(null)
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (postIMG) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCurrentImageUrl(event.target.result)
      }
      reader.readAsDataURL(postIMG)
    }
  }, [postIMG])

  const handleSubmit = (values) => {
    const { title, text } = values

    let formData = new FormData()
    formData.set('title', title)
    formData.set('text', text)
    formData.set('postIMG', postIMG)

    dispatch(addPost(formData)).then(() => {
      dispatch(getAllPosts())
    })
    closeModal()
  }

  const handleImageUpload = (event) => {
    setPostIMG(event.target.files[0])
  }

  const createPostSchema = Yup.object().shape({
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
      initialValues={{ file: '', title: '', text: '' }}
      validationSchema={createPostSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.create_form}>
          <h1>Create Post</h1>
          <div className={styles.create_imgWrap}>
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt="imgPost"
                className={styles.create_postImg}
              />
            ) : (
              <img
                src="https://www.olafbathke.de/photography-blog/wp-content/themes/u-design/assets/images/placeholders/post-placeholder.jpg"
                alt="imgPost"
                className={styles.create_postImg}
              />
            )}
            <button
              className={styles.create_buttonAddImg}
              type="button"
              onClick={() => {
                if (inputFileRef.current) {
                  inputFileRef.current.click()
                }
              }}
            >
              <IoMdAddCircle size="50px" color="white" />
            </button>
            <Field
              className={styles.create_hiddenInput}
              type="file"
              name="postIMG"
              accept="image/*"
              innerRef={inputFileRef}
              onChange={handleImageUpload}
            />
            <ErrorMessage
              name="postIMG"
              component="div"
              style={{
                color: '#f02849',
                fontSize: '16px',
                lineHeight: '16px',
              }}
            />
          </div>
          <Field
            className={styles.create_input}
            type="text"
            name="title"
            placeholder="Write your title"
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
            className={styles.create_textarea}
            type="text"
            as="textarea"
            name="text"
            placeholder="Write your text"
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
          <button className={styles.create_btnCreate} type="submit">
            Create
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default CreatePost
