import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import personalDetailsReducer from '../features/visitor/personalDetailsSlice'
export const store = configureStore({
  reducer: {
    // auth: authReducer,
    personalDetails: personalDetailsReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
