import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Wrapper from '@/assets/wrappers/DashboardFormPage'
import { FormRow, Alert, FormRowSelect, ProtectedRoute } from '@/components'
import { displayAlert } from '@/store/alerts/alertsSlice'
import { handleChange, createJob, editJob, clearValues, JobTypeOptions } from '@/store/jobs/jobsSlice'
import { RootState } from '@/store/rootReducer'

const AddJob: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [animate, setAnimate] = useState(false)
  const dispatch = useDispatch()
  const { isEditing, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, editJobId } =
    useSelector((state: RootState) => state.jobs)

  const { showAlert } = useSelector((state: RootState) => state.alerts)

  useEffect(() => setAnimate(true), [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!position || !company || !jobLocation) {
      displayAlert(dispatch, { alertText: 'Please provide all values!' })
      setLoading(false)
      return
    }

    const job: JobTypeOptions = {
      position,
      company,
      jobLocation,
      jobType,
      status,
      editJobId,
    }

    if (isEditing) {
      editJob(dispatch, job)
      setLoading(false)
      return
    }

    createJob(dispatch, job)
    setLoading(false)
  }

  const handleJobInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name
    const value = e.target.value
    handleChange(dispatch, { name, value })
  }

  const handleClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(clearValues())
  }

  return (
    <ProtectedRoute>
      <Wrapper animate={animate}>
        <form className='form' onSubmit={handleSubmit}>
          <h3>{isEditing ? 'edit job' : 'add job'}</h3>
          {showAlert && <Alert />}

          <div className='form-center'>
            <FormRow type='text' name='position' labelText='Position' value={position} handleChange={handleJobInput} />
            <FormRow type='text' name='company' labelText='Company' value={company} handleChange={handleJobInput} />
            <FormRow
              type='text'
              labelText='Location'
              name='jobLocation'
              value={jobLocation}
              handleChange={handleJobInput}
            />

            <FormRowSelect
              name='status'
              labelText='Status'
              handleChange={handleJobInput}
              value={status}
              list={statusOptions}
            />

            <FormRowSelect
              name='jobType'
              labelText='Job Type'
              handleChange={handleJobInput}
              value={jobType}
              list={jobTypeOptions}
            />

            <div className='btn-container'>
              <button className='btn btn-block submit-btn' type='submit' disabled={loading}>
                Submit
              </button>
              <button className='btn btn-block clear-btn' onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </form>
      </Wrapper>
    </ProtectedRoute>
  )
}

export default AddJob
