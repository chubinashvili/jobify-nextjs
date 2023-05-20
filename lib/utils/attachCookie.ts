import cookie, { CookieSerializeOptions } from 'cookie'
import dotenv from 'dotenv'
import { NextApiResponse } from 'next'

dotenv.config()

export const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24, // 24 hours
  sameSite: 'strict',
  path: '/',
}

const setTokenCookie = (res: NextApiResponse, token: string) => {
  const COOKIE_NAME = 'token'

  res.setHeader('Set-Cookie', cookie.serialize(COOKIE_NAME, token ? `Bearer ${token}` : '', cookieOptions))
}

export default setTokenCookie
