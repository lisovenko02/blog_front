import React, { useEffect } from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import { getAllPosts } from '../redux/post/operations'
import { useDispatch } from 'react-redux'
import DashboardSideBar from '../components/DashboardSideBar/DashboardSideBar'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/Loader/Loader'

const HomePage = () => {
  const dispatch = useDispatch()
  const { isLoading } = useAuth()

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  return isLoading ? (
    <Loader />
  ) : (
    <div style={{ display: 'flex' }}>
      <Dashboard />
      <DashboardSideBar />
    </div>
  )
}

export default HomePage
