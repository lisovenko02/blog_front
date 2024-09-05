import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserProfile } from '../../redux/user/selectors'
import styles from './UserInfo.module.css'
import { useParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import EditUserInfo from '../EditUserInfo/EditUserInfo'
import { useAuth } from '../../hooks/useAuth'

const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()
  const author = useSelector(selectUserProfile)
  const { user } = useAuth()

  const handleToggleSwitch = () => {
    setIsOpen(!isOpen)
  }

  return (
    author && (
      <div className={styles.user_upperContainer}>
        <div className={styles.user_avatarContainer}>
          <img
            className={styles.user_avatarImg}
            src={author.avatarURL}
            alt="img"
            width="100%"
            height="350px"
          />
        </div>
        <div className={styles.user_lowerContainer}>
          <h2 className={styles.user_name}>{author.name}</h2>
          <p className={styles.user_email}>{author.email}</p>
        </div>
        {user?._id === id && (
          <>
            <button className={styles.user_btn} onClick={handleToggleSwitch}>
              Edit Profile
            </button>
            {isOpen && (
              <Modal
                isOpen={isOpen}
                closeModal={handleToggleSwitch}
                children={<EditUserInfo closeModal={handleToggleSwitch} />}
              />
            )}
          </>
        )}
      </div>
    )
  )
}

export default UserInfo
