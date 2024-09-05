import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { GiElephantHead } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../redux/user/selectors'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { logOut } from '../../redux/user/operations'

const Header = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const avatarURL = user ? user.avatarURL : null
  const userId = user ? user._id : ''

  return (
    <div className={styles.header_allContainer}>
      <div className={styles.header_mainContainer}>
        <NavLink to="/">
          <GiElephantHead size="50px" />
          Recrbook
        </NavLink>
        <div className={styles.header_rightSide}>
          <NavLink to={`/user/${userId}`}>
            <img
              src={avatarURL}
              alt="Avatar"
              height="35"
              width="35"
              className={styles.header_avatar}
            />
          </NavLink>
          <NavLink to={`/user/${userId}`}>
            <p className={styles.header_greetingText}>Profile</p>
          </NavLink>
        </div>
        <NavLink
          to={`auth`}
          className={styles.header_btnLogOut}
          onClick={() => dispatch(logOut())}
        >
          <RiLogoutCircleRLine size="40px" />
        </NavLink>
      </div>
    </div>
  )
}

export default Header
