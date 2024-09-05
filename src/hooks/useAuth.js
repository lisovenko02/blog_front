import { useSelector } from 'react-redux'
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} from '../redux/user/selectors'
import { selectAllPosts } from '../redux/post/selectors'

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isRefreshing = useSelector(selectIsRefreshing)
  const user = useSelector(selectUser)
  const posts = useSelector(selectAllPosts)
  const isLoading = useSelector(selectIsLoading)
  return { isLoggedIn, isRefreshing, user, isLoading, posts }
}
