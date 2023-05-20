import { createJob, getAllJobs } from '@/lib/controllers/jobsController'
import testUser from '@/lib/middleware/testUser'
import asyncWrapper from '@/lib/utils/asyncWrapper'
import getHandler from '@/lib/utils/handler'

const handler = getHandler()

export default handler.post(testUser, asyncWrapper(createJob)).get(asyncWrapper(getAllJobs))
