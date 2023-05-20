import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import mongoose, { Document, Model } from 'mongoose'

import { BadRequestError } from '@/lib/errors'

dotenv.config()

export interface IUser extends Document {
  name: string
  email: string
  password: string
  lastName?: string
  location?: string
  createJWT: () => string
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const emailRegex = /^\S+@\S+\.\S+$/

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      validate: {
        validator: (value: string) => emailRegex.test(value),
        message: 'Please provide a valid email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
      select: false,
    },
    lastName: {
      type: String,
      maxlength: 20,
      trim: true,
      default: 'lastName',
    },
    location: {
      type: String,
      maxlength: 20,
      trim: true,
      default: 'my city',
    },
  },
  { timestamps: true },
)

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.createJWT = function (): string {
  if (!process.env.JWT_SECRET || !process.env.JWT_LIFETIME) {
    throw new BadRequestError('JWT_SECRET or JWT_LIFETIME environment variable is not defined')
  }
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

const User: Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema)

export default User
