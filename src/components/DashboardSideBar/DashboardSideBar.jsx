import React, { useState } from 'react'
import styles from './DashboardSideBar.module.css'
import PopularPostsList from '../PopularPostsList/PopularPostsList'
import { MdOutlinePlaylistAdd } from 'react-icons/md'
import Modal from '../Modal/Modal'
import CreatePost from '../CreatePost/CreatePost'

const DashboardSideBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleSwitch = () => setIsOpen(!isOpen)

  return (
    <aside className={styles.dashboardSideBar_container}>
      <div
        onClick={handleToggleSwitch}
        className={styles.dashboardSideBar_createContainer}
      >
        <MdOutlinePlaylistAdd /> Create
      </div>
      <div>
        <PopularPostsList />
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={handleToggleSwitch}
          children={<CreatePost closeModal={handleToggleSwitch} />}
        />
      )}
    </aside>
  )
}

export default DashboardSideBar
