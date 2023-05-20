import { showStats } from '@/lib/controllers/jobsController'
import asyncWrapper from '@/lib/utils/asyncWrapper'
import getHandler from '@/lib/utils/handler'

const handler = getHandler()

export default handler.get(asyncWrapper(showStats))
