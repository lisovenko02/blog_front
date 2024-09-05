import React, { useCallback, useEffect } from 'react'
import UserInfo from '../../components/UserInfo/UserInfo'
import UserPostsList from '../../components/UserPostsList/UserPostsList'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserPosts } from '../../redux/post/operations'
import { getUser } from '../../redux/user/operations'
import styles from './UserPage.module.css'

const UserPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const fetchUserPosts = useCallback(async () => {
    try {
      dispatch(getUserPosts(id))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, id])

  useEffect(() => {
    fetchUserPosts()
  }, [fetchUserPosts, id])

  const fetchUserInfo = useCallback(async () => {
    try {
      dispatch(getUser(id))
    } catch (err) {
      console.log(err)
    }
  }, [dispatch, id])

  useEffect(() => {
    fetchUserInfo()
  }, [fetchUserInfo, id])

  return (
    <div className={styles.user_container}>
      <div className={styles.user_info}>
        <UserInfo />
      </div>
      <div className={styles.user_posts}>
        <UserPostsList userId={id} />
      </div>
    </div>
  )
}

export default UserPage
