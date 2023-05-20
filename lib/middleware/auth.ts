import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

import { UnauthenticatedError } from '../errors'
import User from '../models/User'

dotenv.config()

interface IPayload {
  userId: string
}

export interface ReqUser {
  userId: string
  testUser: boolean
}

interface CustomNextApiRequest extends NextApiRequest {
  user?: ReqUser
}

const auth = async (req: CustomNextApiRequest, res: NextApiResponse, next: NextHandler) => {
  try {
    const authHeader = req.cookies.token

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1]
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      throw new UnauthenticatedError('JWT secret is not defined')
    }

    const decoded = jwt.verify(token, jwtSecret) as IPayload

    const user = await User.findById(decoded.userId)

    if (!user) {
      throw new UnauthenticatedError('Authentication Invalid')
    }

    const testUser = decoded.userId === '6394a57e04071c7ed84c7218'

    req.user = { userId: decoded.userId, testUser }

    next()
  } catch (err) {
    next(err)
  }
}

export default auth
