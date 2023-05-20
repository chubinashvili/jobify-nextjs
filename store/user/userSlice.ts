import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import Router from 'next/router'

import { clearAlert, resetAlertsState, setErrorAlert, setupUserAlert, updateUserAlert } from '../alerts/alertsSlice'
import { resetJobsState } from '../jobs/jobsSlice'
import { resetStatsState } from '../stats/statsSlice'

export interface UserType {
  name?: string
  email?: string
  lastName?: string
  location?: string
  password?: string
}

export interface User extends UserType {
  _id: string
  __v: number
}

export interface InitialState {
  user: User | null
  userLocation: string
  jobLocation: string
}

export const initialState: InitialState = {
  user: null,
  userLocation: '',
  jobLocation: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        user: User
        location: string
        alertText: string
      }>,
    ) {
      state.user = action.payload.user
      state.userLocation = action.payload.location
      state.jobLocation = action.payload.location
    },
    setUpdateUser(state, action: PayloadAction<{ user: User; location: string }>) {
      state.user = action.payload.user
      state.userLocation = action.payload.location
      state.jobLocation = action.payload.location
    },
    setCurrentUser(state, action: PayloadAction<{ user: User; location: string }>) {
      state.user = action.payload.user
      state.userLocation = action.payload.location
      state.jobLocation = action.payload.location
    },
    resetUserState: () => initialState,
  },
})

export const { setUser, setUpdateUser, setCurrentUser, resetUserState } = userSlice.actions

export const setupUser = async (
  dispatch: Dispatch,
  { currentUser, endpoint, alertText }: { currentUser: UserType; endpoint: string; alertText: string },
) => {
  try {
    const { data } = await axios.post(`/api/${endpoint}`, currentUser)
    const { user, location } = data
    dispatch(setUser({ user, location, alertText }))
    dispatch(setupUserAlert({ alertText }))

    if (user) {
      setTimeout(() => {
        Router.replace('/')
      }, 2000)
    }
  } catch (err: any) {
    dispatch(setErrorAlert({ msg: err?.response?.data?.error }))
  }
  clearAlert(dispatch)
}

export const logoutUser = async (dispatch: Dispatch) => {
  try {
    await axios.get('/api/logout')
    dispatch(resetUserState())
    dispatch(resetStatsState())
    dispatch(resetAlertsState())
    dispatch(resetJobsState())

    Router.replace('/landing')
  } catch (err: any) {
    console.log(err?.response)
  }
  clearAlert(dispatch)
}

export const updateUser = async (dispatch: Dispatch, currentUser: UserType) => {
  try {
    const { data } = await axios.patch('/api/update-user', currentUser)

    const { user, location } = data

    dispatch(setUpdateUser({ user, location }))
    dispatch(updateUserAlert())
  } catch (err: any) {
    dispatch(setErrorAlert({ msg: err?.response?.data?.error }))
  }
  clearAlert(dispatch)
}

export const getCurrentUser = async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('/api/get-current-user')
    const { user, location } = data
    dispatch(setCurrentUser({ user, location }))

    return user
  } catch (err: any) {
    logoutUser(dispatch)
  }
  clearAlert(dispatch)
}

export default userSlice.reducer
