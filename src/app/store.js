import { configureStore } from '@reduxjs/toolkit'

import notificationsSlice from '../feature/notifications/notificationsSlice'
import postsReducer from '../feature/posts/postsSlice'
import usersSlice from '../feature/users/usersSlice'

export default configureStore({
  reducer: {
    posts : postsReducer,
    users : usersSlice,
    notifications : notificationsSlice,
  }
})
