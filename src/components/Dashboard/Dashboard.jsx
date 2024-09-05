import React, { useState } from 'react'
import PostsList from '../PostsList/PostsList'
import styles from './Dashboard.module.css'
import { MdOutlinePlaylistAdd } from 'react-icons/md'
import Modal from '../Modal/Modal'
import CreatePost from '../CreatePost/CreatePost'

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleSwitch = () => setIsOpen(!isOpen)

  return (
    <div className={styles.dashboard_mainContainer}>
      <div className={styles.dashboard_createContainer}>
        <button
          onClick={handleToggleSwitch}
          type="button"
          className={styles.dashboard_createBtn}
        >
          <MdOutlinePlaylistAdd size="17px" />
          <span>Create a new post</span>
        </button>
      </div>
      <PostsList />
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

export default Dashboard
