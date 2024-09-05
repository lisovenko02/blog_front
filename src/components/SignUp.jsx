import React from 'react'
import styles from '../pages/AuthPage/AuthPage.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { register } from '../redux/user/operations'
import * as yup from 'yup'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const dispatch = useDispatch()

  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(25, 'Maximum name length is 25 symbols')
      .required('Name is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Invalid email format'
      )
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(24, 'Maximum password length is 24 symbols')
      .required('Password is required'),
  })

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values))
    resetForm()
  }

  return (
    <div
      className={`${styles['form-container']} ${styles['sign-up-container']}`}
    >
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.authForm}>
            <h1>Create Account</h1>
            <div className={styles['social-container']}>
              <Link href="#" className={`${styles.social} ${styles.authLink}`}>
                <i className="fab fa-google-plus-g"></i>
              </Link>
            </div>
            <span>or</span>
            <Field
              className={styles.authInput}
              type="text"
              name="name"
              placeholder="Name"
            />
            <ErrorMessage
              name="name"
              component="div"
              style={{
                color: '#f02849',
                fontSize: '13px',
                lineHeight: '16px',
              }}
            />
            <Field
              className={styles.authInput}
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              style={{
                color: '#f02849',
                fontSize: '13px',
                lineHeight: '16px',
              }}
            />
            <Field
              className={styles.authInput}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              style={{
                color: '#f02849',
                fontSize: '13px',
                lineHeight: '16px',
              }}
            />
            <button className={styles.authBtn} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
