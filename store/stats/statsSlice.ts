import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { clearAlert, setErrorAlert } from '../alerts/alertsSlice'

interface Stats {
  pending: number
  interview: number
  declined: number
}

interface MonthlyApplication {
  date: string
  count: number
}

export interface InitialState {
  stats: Stats
  monthlyApplications: MonthlyApplication[]
}

export const initialState: InitialState = {
  stats: { pending: 0, interview: 0, declined: 0 },
  monthlyApplications: [],
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setShowStats(
      state,
      action: PayloadAction<{
        stats: Stats
        monthlyApplications: MonthlyApplication[]
      }>,
    ) {
      state.stats = action.payload.stats
      state.monthlyApplications = action.payload.monthlyApplications
    },
    resetStatsState: () => initialState,
  },
})

export const { setShowStats, resetStatsState } = statsSlice.actions

export const showStats = async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('/api/jobs/stats')
    dispatch(
      setShowStats({
        stats: data.defaultStats,
        monthlyApplications: data.monthlyApplications,
      }),
    )
  } catch (err: any) {
    dispatch(setErrorAlert({ msg: err?.response?.data?.error }))
  }
  clearAlert(dispatch)
}

export default statsSlice.reducer
