import React, { useState } from 'react'
import styles from './AuthPage.module.css'
import { Toaster } from 'react-hot-toast'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'

const AuthPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false)

  const handleSignUpClick = () => {
    setIsRightPanelActive(true)
  }

  const handleSignInClick = () => {
    setIsRightPanelActive(false)
  }

  return (
    <div
      className={`${styles.container} ${
        isRightPanelActive ? styles['right-panel-active'] : ''
      }`}
      id="container"
    >
      <Toaster position="top-right" reverseOrder={false} />
      {isRightPanelActive ? <SignUp /> : <SignIn />}
      <div className={styles['overlay-container']}>
        <div className={styles.overlay}>
          <div
            className={`${styles['overlay-panel']} ${
              isRightPanelActive
                ? styles['overlay-left']
                : styles['overlay-right']
            }`}
          >
            <h1>{!isRightPanelActive ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
            <p className={styles.authText}>
              {!isRightPanelActive
                ? 'Enter your personal details and start journey with us'
                : 'To keep connected with us please login with your personal info'}
            </p>
            <button
              className={`ghost ${styles.ghost} ${styles.authBtn}`}
              onClick={
                isRightPanelActive ? handleSignInClick : handleSignUpClick
              }
            >
              {isRightPanelActive ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
