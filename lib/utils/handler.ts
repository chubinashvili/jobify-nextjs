import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect, { NextHandler } from 'next-connect'

import dbConnect from './dbConnect'
import auth from '../middleware/auth'

export interface ReqUser {
  userId: string
  testUser: boolean
}

interface CustomNextApiRequest extends NextApiRequest {
  user?: ReqUser
}

function getHandler() {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
      res.status(501).json({ error: `${error.message}` })
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` })
    },
  }).use(async (req: CustomNextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const { url } = req
    await dbConnect()

    if (url === '/api/login' || url === '/api/register' || url === '/api/logout') {
      next()
    } else {
      auth(req, res, next)
    }
  })
}

export default getHandler
