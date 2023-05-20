import mongoose, { Document, Model, Types } from 'mongoose'

export interface IJob extends Document {
  company: string
  position: string
  status?: 'interview' | 'declined' | 'pending'
  jobType?: 'full-time' | 'part-time' | 'remote' | 'internship'
  jobLocation: string
  createdBy?: Types.ObjectId | string
}

const JobSchema = new mongoose.Schema<IJob>(
  {
    company: {
      type: String,
      required: [true, 'Please provide company'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true },
)

const Job: Model<IJob> = mongoose.models.Job || mongoose.model('Job', JobSchema)

export default Job
