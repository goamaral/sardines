import mongoose from 'mongoose'
import bluebird from 'bluebird'
import User from './User'
import Submission from './Submission'
import dotenv from 'dotenv'

dotenv.config()
mongoose.Promise = bluebird

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log(`Connected to MongoDB at ${process.env.MONGO_URL}`))
mongoose.connection.on('error', err => console.log(`Failed to connect to MongoDB (${err})`))

export default mongoose.connection

export {
  User,
  Submission
}