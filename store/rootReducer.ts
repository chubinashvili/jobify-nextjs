import { combineReducers } from '@reduxjs/toolkit'

import alertsReducer from './alerts/alertsSlice'
import jobsReducer from './jobs/jobsSlice'
import statsReducer from './stats/statsSlice'
import userReducer from './user/userSlice'

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobsReducer,
  stats: statsReducer,
  alerts: alertsReducer,
})

export default rootReducer
