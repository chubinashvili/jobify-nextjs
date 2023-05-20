import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

type AlertType = 'success' | 'danger' | ''

export interface InitialState {
  showAlert: boolean
  alertText: string
  alertType: AlertType
}

export const initialState: InitialState = {
  showAlert: false,
  alertText: '',
  alertType: '',
}

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setupUserAlert(state, action: PayloadAction<{ alertText: string }>) {
      state.showAlert = true
      state.alertType = 'success'
      state.alertText = `${action.payload.alertText} Redirecting...`
    },
    setErrorAlert(state, action: PayloadAction<{ msg: string }>) {
      state.showAlert = true
      state.alertType = 'danger'
      state.alertText = action.payload.msg
    },
    updateUserAlert(state) {
      state.showAlert = true
      state.alertType = 'success'
      state.alertText = 'User Profile Updated!'
    },
    setClearAlert(state) {
      state.showAlert = false
      state.alertType = ''
      state.alertText = ''
    },
    setDisplayAlert(state, action: PayloadAction<{ alertText?: string }>) {
      state.showAlert = true
      state.alertType = 'danger'
      if (action.payload && action.payload.alertText) {
        state.alertText = action.payload.alertText
      } else {
        state.alertText = 'Please provide all values!'
      }
    },
    createJobAlert(state) {
      state.showAlert = true
      state.alertType = 'success'
      state.alertText = 'New Job Created!'
    },
    jobsLoadingAlert(state) {
      state.showAlert = false
    },
    editJobAlert(state) {
      state.showAlert = true
      state.alertType = 'success'
      state.alertText = 'Job Updated!'
    },
    resetAlertsState: () => initialState,
  },
})

export const {
  setupUserAlert,
  setErrorAlert,
  updateUserAlert,
  setClearAlert,
  setDisplayAlert,
  createJobAlert,
  jobsLoadingAlert,
  editJobAlert,
  resetAlertsState,
} = alertsSlice.actions

export const clearAlert = async (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(setClearAlert())
  }, 3000)
}
export const displayAlert = async (dispatch: Dispatch, payload: { alertText: string }) => {
  dispatch(setDisplayAlert(payload))
  clearAlert(dispatch)
}

export default alertsSlice.reducer
