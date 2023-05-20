import { StatusCodes } from 'http-status-codes'
import moment from 'moment'
import { Types } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

import { BadRequestError, NotFoundError } from '@/lib/errors'
import { ReqUser } from '@/lib/middleware/auth'
import Job, { IJob } from '@/lib/models/Job'
import checkPermissions from '@/lib/utils/checkPermissions'

interface CustomNextApiRequest extends NextApiRequest {
  user?: ReqUser
}

const createJob = async (req: CustomNextApiRequest, res: NextApiResponse): Promise<void> => {
  const { position, company } = req.body

  if (!position || !company) {
    throw new BadRequestError('Please provide all values')
  }

  req.body.createdBy = (req.user as ReqUser).userId

  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req: CustomNextApiRequest, res: NextApiResponse): Promise<void> => {
  const { status, jobType, sort, search } = req.query

  const queryObject: any = {
    createdBy: (req.user as ReqUser).userId,
  }

  if (status && status !== 'all') {
    queryObject.status = status
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }

  let result = Job.find(queryObject)

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }

  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }

  if (sort === 'a-z') {
    result = result.sort('position')
  }

  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const jobs = await result

  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}
const updateJob = async (req: CustomNextApiRequest, res: NextApiResponse): Promise<void> => {
  const { id: jobId } = req.query
  const { company, position } = req.body

  if (!company || !position) {
    throw new BadRequestError('Please provide all values')
  }

  const job = await Job.findOne({ _id: jobId })
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`)
  }

  const createdBy = job?.createdBy as IJob['createdBy']

  if (createdBy === undefined) {
    throw new BadRequestError('The createdBy property is missing')
  }

  checkPermissions(req.user as ReqUser, createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(StatusCodes.OK).json({ updatedJob })
}

const deleteJob = async (req: CustomNextApiRequest, res: NextApiResponse): Promise<void> => {
  const { id: jobId } = req.query

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`)
  }

  const createdBy = job?.createdBy as IJob['createdBy']

  if (createdBy === undefined) {
    throw new BadRequestError('The createdBy property is missing')
  }

  checkPermissions(req.user as ReqUser, createdBy)

  await job.deleteOne()
  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}

const showStats = async (req: CustomNextApiRequest, res: NextApiResponse): Promise<void> => {
  const userId = new Types.ObjectId((req.user as ReqUser)?.userId)

  if (!userId) {
    throw new Error('User ID not available')
  }

  const stats = await Job.aggregate([
    { $match: { createdBy: userId } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])

  const defaultStats = {
    pending: 0,
    interview: 0,
    declined: 0,
  }

  stats.forEach(({ _id, count }: { _id: string; count: number }) => {
    defaultStats[_id as keyof typeof defaultStats] = count
  })

  const monthlyApplications = await Job.aggregate([
    { $match: { createdBy: userId } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])

  const formattedMonthlyApplications = monthlyApplications
    .map((item: { _id: { year: number; month: number }; count: number }) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications: formattedMonthlyApplications })
}

export { createJob, getAllJobs, updateJob, deleteJob, showStats }
