import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/Loader/Loader'

export const PublicRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth()

  if (isRefreshing) {
    return <Loader />
  }

  if (isLoggedIn) {
    const initialPath = localStorage.getItem('initialPath')
    localStorage.removeItem('initialPath')
    return <Navigate to={initialPath || redirectTo} />
  }

  return Component
}
