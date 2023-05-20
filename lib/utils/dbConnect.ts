import mongoose from 'mongoose'

const connection: { isConnected?: number } = {}

export async function dbConnect() {
  // check if we are already connected
  if (connection.isConnected) {
    return
  }

  // check if MONGODB_URI is defined
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined')
  }

  // connect to our database
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as Parameters<typeof mongoose.connect>[1]

  const db = await mongoose.connect(process.env.MONGODB_URI, options)

  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
