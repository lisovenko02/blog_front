import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/slice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { postReducer } from './post/slice'
import { commentsReducer } from './comments/slice'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'accessToken'],
}

export const store = configureStore({
  reducer: {
    user: persistReducer(authPersistConfig, userReducer),
    post: postReducer,
    comment: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
