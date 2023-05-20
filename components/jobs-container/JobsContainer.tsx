import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Alert, Loading } from '..'
import Job from '../job/Job'
import PageBtnContainer from '../page-btn-container/PageBtnContainer'
import Wrapper from '@/assets/wrappers/JobsContainer'
import { getJobs } from '@/store/jobs/jobsSlice'
import { RootState } from '@/store/rootReducer'

const JobsContainer: NextPage<{ animate: boolean }> = ({ animate }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { jobs, page, totalJobs, numOfPages, search, searchStatus, searchType, sort } = useSelector(
    (state: RootState) => state.jobs,
  )

  const { showAlert } = useSelector((state: RootState) => state.alerts)

  useEffect(() => {
    setLoading(true)
    getJobs(dispatch, { page, search, searchStatus, searchType, sort })
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, searchStatus, searchType, sort])

  if (loading) {
    return <Loading center />
  }

  if (jobs.length === 0) {
    return (
      <Wrapper animate={animate}>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper animate={animate}>
      {showAlert && <Alert />}
      <h5>
        {totalJobs} job{jobs.length > 1 ? 's' : ''} found
      </h5>
      <div className='jobs'>
        {jobs.map(job => (
          <Job
            key={job._id}
            {...job}
            page={page}
            search={search}
            searchStatus={searchStatus}
            searchType={searchType}
            sort={sort}
          />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
