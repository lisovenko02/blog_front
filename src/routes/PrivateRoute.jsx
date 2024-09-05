import { useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/Loader/Loader'

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/auth',
}) => {
  const { isLoggedIn, isRefreshing } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (!isLoggedIn && !isRefreshing) {
      localStorage.setItem('initialPath', location.pathname)
    }
  }, [isLoggedIn, isRefreshing, location])

  if (isRefreshing) {
    return <Loader />
  }

  return isLoggedIn ? Component : <Navigate to={redirectTo} />
}
