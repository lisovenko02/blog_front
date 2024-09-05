import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import styles from './EditUserInfo.module.css'
import { useAuth } from '../../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { editUserProfile } from '../../redux/user/operations'
import { IoMdAddCircle } from 'react-icons/io'
import { AiTwotoneEye, AiTwotoneEyeInvisible } from 'react-icons/ai'
import * as Yup from 'yup'

const EditUserInfo = ({ closeModal }) => {
  const { user } = useAuth()
  const [avatarIMG, setAvatarIMG] = useState(null)
  const [currentImageUrl, setCurrentImageUrl] = useState(user.avatarURL)
  const dispatch = useDispatch()
  const inputFileRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (avatarIMG) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCurrentImageUrl(event.target.result)
      }
      reader.readAsDataURL(avatarIMG)
    }
  }, [avatarIMG])

  const initialValues = {
    avatarURL: currentImageUrl,
    name: user.name || '',
    email: user.email || '',
    password: '',
  }

  const handleSubmit = (values) => {
    const { name, email, password } = values

    let formData = new FormData()
    formData.set('name', name)
    formData.set('email', email)

    if (password) formData.set('password', password)
    if (avatarIMG) formData.set('avatar', avatarIMG)
    console.log(avatarIMG)
    dispatch(editUserProfile(formData))
    closeModal()
  }

  const handleImageUpload = (event) => {
    setAvatarIMG(event.target.files[0])
  }

  const editUserSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(25, 'Maximum name length is 25 symbols')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Invalid email format'
      )
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(24, 'Maximum password length is 24 symbols')
      .required('Password is required'),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editUserSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {() => (
        <Form className={styles.editProfile_form}>
          <h1>Edit Profile</h1>
          <div className={styles.editProfile_imgWrap}>
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt="imgPost"
                className={styles.editProfile_avatarImg}
              />
            ) : (
              <img
                src={user.avatarURL}
                alt="imgPost"
                className={styles.editProfile_postImg}
              />
            )}
            <button
              className={styles.editProfile_buttonAddImg}
              type="button"
              onClick={() => {
                if (inputFileRef.current) {
                  inputFileRef.current.click()
                }
              }}
            >
              <IoMdAddCircle size="24px" color="#30363d" />
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
            name="name"
            placeholder="Name"
            className={styles.editProfile_input}
          />
          <ErrorMessage
            name="name"
            component="div"
            style={{
              color: '#f02849',
              fontSize: '15px',
              lineHeight: '16px',
            }}
          />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className={styles.editProfile_input}
          />
          <ErrorMessage
            name="email"
            component="div"
            style={{
              color: '#f02849',
              fontSize: '15px',
              lineHeight: '16px',
            }}
          />
          <div className={styles.editProfile_passWrap}>
            <Field
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className={styles.editProfile_input}
            />
            <div
              className={styles.editProfile_togglePassWrap}
              onClick={handleTogglePassword}
            >
              {showPassword ? (
                <AiTwotoneEye size="22px" />
              ) : (
                <AiTwotoneEyeInvisible size="22px" />
              )}
            </div>
            <ErrorMessage
              name="password"
              component="div"
              style={{
                color: '#f02849',
                fontSize: '15px',
                lineHeight: '16px',
              }}
            />
          </div>
          <div className={styles.editProfile_buttonsWrap}>
            <button type="submit" className={styles.editProfile_sendBtn}>
              Update
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditUserInfo
