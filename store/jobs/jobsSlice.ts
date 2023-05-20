import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { clearAlert, createJobAlert, setErrorAlert, jobsLoadingAlert, editJobAlert } from '../alerts/alertsSlice'

export type Status = 'interview' | 'declined' | 'pending'

export type JobType = 'full-time' | 'part-time' | 'remote' | 'internship'

export type Sort = 'latest' | 'oldest' | 'a-z' | 'z-a'

export interface JobTypeOptions {
  company: string
  position: string
  status: Status
  jobType: JobType
  jobLocation: string
  editJobId: string
}

export interface Job extends JobTypeOptions {
  _id: string
  createdBy: string
  createdAt: string
  updatedAt: string
  __v?: number
}

export interface InitialState {
  userLocation: string
  jobLocation: string
  isEditing: boolean
  editJobId: string
  position: string
  company: string
  status: Status
  jobs: Job[]
  totalJobs: number
  numOfPages: number
  jobTypeOptions: string[]
  jobType: JobType
  statusOptions: string[]
  page: number
  search: string
  searchStatus: string
  searchType: string
  sort: Sort
  sortOptions: string[]
  showSidebar: boolean
}

export const initialState: InitialState = {
  userLocation: '',
  jobLocation: '',
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  page: 1,
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  showSidebar: false,
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setGetJobs(
      state,
      action: PayloadAction<{
        jobs: Job[]
        totalJobs: number
        numOfPages: number
      }>,
    ) {
      state.jobs = action.payload.jobs
      state.totalJobs = action.payload.totalJobs
      state.numOfPages = action.payload.numOfPages
    },
    setEditJobPage(state, action: PayloadAction<{ id: string }>) {
      const job = state.jobs.find(job => job._id === action.payload.id)

      if (job) {
        const { _id, position, jobLocation, company, jobType, status } = job
        state.isEditing = true
        state.editJobId = _id
        state.position = position
        state.company = company
        state.jobLocation = jobLocation
        state.jobType = jobType
        state.status = status
      }
    },
    clearValues(state) {
      state.isEditing = false
      state.editJobId = ''
      state.position = ''
      state.company = ''
      state.jobLocation = state.userLocation
      state.jobType = 'full-time'
      state.status = 'pending'
    },
    setHandleChange(state, action: PayloadAction<{ name: string; value: string }>) {
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      }
    },
    setClearFilters(state) {
      state.search = ''
      state.searchStatus = 'all'
      state.searchType = 'all'
      state.sort = 'latest'
    },
    setToggleSidebar(state) {
      state.showSidebar = !state.showSidebar
    },
    setChangePage(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page
    },
    resetJobsState: () => initialState,
  },
})

export const {
  setGetJobs,
  setEditJobPage,
  setHandleChange,
  setClearFilters,
  setToggleSidebar,
  clearValues,
  setChangePage,
  resetJobsState,
} = jobsSlice.actions

export const createJob = async (dispatch: Dispatch, job: JobTypeOptions) => {
  try {
    const { company, position, jobLocation, jobType, status } = job
    await axios.post('/api/jobs', {
      company,
      position,
      jobLocation,
      jobType,
      status,
    })

    dispatch(createJobAlert())

    dispatch(clearValues())
  } catch (err: any) {
    dispatch(setErrorAlert({ msg: err?.response?.data?.error }))
  }
  clearAlert(dispatch)
}

export const getJobs = async (
  dispatch: Dispatch,
  {
    page,
    search,
    searchStatus,
    searchType,
    sort,
  }: {
    page: number
    search: string
    searchStatus: string
    searchType: string
    sort: Sort
  },
) => {
  let url = `/api/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
  if (search) {
    url = url + `&search=${search}`
  }
  dispatch(jobsLoadingAlert())
  try {
    const { data } = await axios(url)
    const { jobs, totalJobs, numOfPages } = data
    dispatch(setGetJobs({ jobs, totalJobs, numOfPages }))
  } catch (err: any) {
    dispatch(setErrorAlert({ msg: err?.response?.data?.error }))
  }
  clearAlert(dispatch)
}
export const setEditJob = async (dispatch: Dispatch, id: string) => {
  dispatch(setEditJobPage({ id }))
}

export const editJob = async (dispatch: Dispatch, job: JobTypeOptions) => {
  try {
    const { position, company, jobLocation, jobType, status } = job

    await axios.patch(`/api/jobs/${job.editJobId}`, {
      company,
      position,
      jobLocation,
      jobType,
      status,
    })

    dispatch(editJobAlert())

    dispatch(clearValues())
  } catch (err: any) {
    dispatch(setErrorAlert({ msg: err?.response?.data?.error }))
  }
  clearAlert(dispatch)
}
export const deleteJob = async (
  dispatch: Dispatch,
  jobId: string,
  {
    page,
    search,
    searchStatus,
    searchType,
    sort,
  }: {
    page: number
    search: string
    searchStatus: string
    searchType: string
    sort: Sort
  },
) => {
  try {
    await axios.delete(`/api/jobs/${jobId}`)
    getJobs(dispatch, { page, search, searchStatus, searchType, sort })
  } catch (err: any) {
    dispatch(setErrorAlert({ msg: err?.response?.data?.msg }))
  }
  clearAlert(dispatch)
}

export const handleChange = async (dispatch: Dispatch, { name, value }: { name: string; value: string }) => {
  dispatch(setHandleChange({ name, value }))
}

export const clearFilters = async (dispatch: Dispatch) => {
  dispatch(setClearFilters())
}

export const toggleSidebar = async (dispatch: Dispatch) => {
  dispatch(setToggleSidebar())
}

export const changePage = async (dispatch: Dispatch, page: number) => {
  dispatch(setChangePage({ page }))
}

export default jobsSlice.reducer
