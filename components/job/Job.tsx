import moment from 'moment'
import { NextPage } from 'next'
import Link from 'next/link'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import JobInfo from '../job-info/JobInfo'
import Wrapper from '@/assets/wrappers/Job'
import { setEditJob, deleteJob, Job as JobType, Sort } from '@/store/jobs/jobsSlice'

interface JobProps extends JobType {
  page: number
  search: string
  searchStatus: string
  searchType: string
  sort: Sort
}

const Job: NextPage<JobProps> = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
  page,
  search,
  searchStatus,
  searchType,
  sort,
}) => {
  const dispatch = useDispatch()

  const date = moment(createdAt).format('MMM Do, YYYY')

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link href='/add-job' legacyBehavior>
              <a className='btn edit-btn' onClick={() => setEditJob(dispatch, _id)}>
                Edit
              </a>
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() =>
                deleteJob(dispatch, _id, {
                  page,
                  search,
                  searchStatus,
                  searchType,
                  sort,
                })
              }
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
