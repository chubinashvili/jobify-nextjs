import cookie from 'cookie'
import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'

import { BadRequestError, UnauthenticatedError } from '@/lib/errors'
import { ReqUser } from '@/lib/middleware/auth'
import User, { IUser } from '@/lib/models/User'
import setTokenCookie, { cookieOptions } from '@/lib/utils/attachCookie'

interface CustomNextApiRequest extends NextApiRequest {
  user?: ReqUser
}

const register = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all values' })
    return
  }

  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email already in use' })
    return
  }

  const user = await User.create({ name, email, password })
  const token = user.createJWT()
  setTokenCookie(res, token)

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    location: user.location,
  })
}

const login = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT()

  const userWithoutPassword: Partial<IUser> = {}

  for (const key in user.toJSON()) {
    if (key !== 'password') {
      userWithoutPassword[key as keyof IUser] = user[key as keyof IUser]
    }
  }

  setTokenCookie(res, token)
  res.status(StatusCodes.OK).json({ user: userWithoutPassword, location: user.location })
}

const updateUser = async (req: CustomNextApiRequest, res: NextApiResponse): Promise<void> => {
  const { email, name, lastName, location } = req.body
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }

  const userId = req.user?.userId // Access the user property based on your authentication implementation

  if (!userId) {
    throw new BadRequestError('User ID not available')
  }

  const user = await User.findOne({ _id: userId })

  if (!user) {
    throw new BadRequestError('User not found')
  }

  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  const token = user.createJWT()
  setTokenCookie(res, token)
  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  })
}

const getCurrentUser = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const user = await User.findOne({ _id: req.user?.userId })
  if (!user) {
    throw new BadRequestError('User not found')
  }
  res.status(StatusCodes.OK).json({ user, location: user.location })
}

const logout = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const COOKIE_NAME = 'token'

  res.setHeader(
    'Set-Cookie',
    cookie.serialize(COOKIE_NAME, '', {
      ...cookieOptions,
      maxAge: -1,
    }),
  )

  req.user = undefined
  res.status(StatusCodes.OK).json({ msg: 'User logged out!' })
}
export { register, login, updateUser, getCurrentUser, logout }
