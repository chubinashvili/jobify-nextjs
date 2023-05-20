import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

import { ReqUser } from './auth'
import { BadRequestError } from '@/lib/errors'

interface CustomNextApiRequest extends NextApiRequest {
  user?: ReqUser
}

const testUser = (req: CustomNextApiRequest, res: NextApiResponse, next: NextHandler) => {
  if (req.user?.testUser) {
    throw new BadRequestError('Test User. Read Only!')
  }
  next()
}

export default testUser
