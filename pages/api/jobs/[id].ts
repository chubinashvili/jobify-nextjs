import { deleteJob, updateJob } from '@/lib/controllers/jobsController'
import testUser from '@/lib/middleware/testUser'
import asyncWrapper from '@/lib/utils/asyncWrapper'
import getHandler from '@/lib/utils/handler'

const handler = getHandler()

export default handler.delete(testUser, asyncWrapper(deleteJob)).patch(testUser, asyncWrapper(updateJob))
