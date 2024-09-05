import React from 'react'
import styles from '../pages/AuthPage/AuthPage.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { login } from '../redux/user/operations'
import * as yup from 'yup'
import { Link } from 'react-router-dom'

const SignIn = () => {
  const dispatch = useDispatch()

  const handleSubmit = (values, { resetForm }) => {
    const { email, password } = values
    dispatch(login({ email, password }))
    resetForm()
  }

  const loginSchema = yup.object().shape({
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

  return (
    <div
      className={`${styles['form-container']} ${styles['sign-in-container']}`}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.authForm}>
            <h1>Sign in</h1>
            <div className={styles['social-container']}>
              <Link to="#" className={`${styles.social} ${styles.authLink}`}>
                <i className="fab fa-google-plus-g"></i>
              </Link>
            </div>
            <span>or use your account</span>
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
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignIn
