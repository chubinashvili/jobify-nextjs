import { UnauthenticatedError } from '../errors'
import { IJob } from '../models/Job'

const checkPermissions = (requestUser: { userId: string }, resourceUserId: IJob['createdBy']): void => {
  // if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId?.toString()) return
  throw new UnauthenticatedError('Not authorized to access this route')
}

export default checkPermissions
