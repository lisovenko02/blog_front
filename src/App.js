import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { PrivateRoute } from './routes/PrivateRoute'
import { PublicRoute } from './routes/PublicRoute'
import { useAuth } from './hooks/useAuth'
import { useDispatch } from 'react-redux'
import { Suspense, lazy, useEffect } from 'react'
import { refreshUser } from './redux/user/operations'
import Loader from './components/Loader/Loader'

const HomePage = lazy(() => import('./pages/HomePage'))
const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage'))
const PostPage = lazy(() => import('./pages/PostPage/PostPage'))
const UserPage = lazy(() => import('./pages/UserPage/UserPage'))

function App() {
  const { isRefreshing } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])

  return isRefreshing ? (
    <Loader />
  ) : (
    <Suspense>
      <Routes>
        <Route
          path="/auth"
          element={<PublicRoute component={<AuthPage />} redirectTo="/" />}
        />
        <Route
          path="/"
          element={<PrivateRoute component={<Layout />} redirectTo={'/auth'} />}
        >
          <Route index element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
