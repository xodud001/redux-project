import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../feature/posts/postsSlice'
import usersSlice from '../feature/users/usersSlice'

export default configureStore({
  reducer: {
    posts : postsReducer,
    users : usersSlice
  }
})
