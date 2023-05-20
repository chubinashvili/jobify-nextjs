import { logout } from '@/lib/controllers/authController'
import asyncWrapper from '@/lib/utils/asyncWrapper'
import getHandler from '@/lib/utils/handler'

const handler = getHandler()

export default handler.post(asyncWrapper(logout))
