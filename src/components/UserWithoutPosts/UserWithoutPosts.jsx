import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user/selectors'
import styles from './UserWithoutPosts.module.css'
import Modal from '../Modal/Modal'
import CreatePost from '../CreatePost/CreatePost'

const UserWithoutPosts = ({ userId }) => {
  const { _id } = useSelector(selectUser)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleSwitch = () => setIsOpen(!isOpen)

  return (
    <div>
      {userId === _id ? (
        <p className={styles.withoutPosts_text}>
          You have no posts yet. Click{' '}
          <span
            className={styles.withoutPosts_span}
            onClick={handleToggleSwitch}
          >
            here
          </span>{' '}
          to create
        </p>
      ) : (
        <p className={styles.withoutPosts_text}>
          Unfortunately, the user has not yet created any post. 😥
        </p>
      )}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={handleToggleSwitch}
          children={<CreatePost closeModal={handleToggleSwitch} />}
        />
      )}
    </div>
  )
}

export default UserWithoutPosts
