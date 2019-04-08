import mongoose from 'mongoose'
import bluebird from 'bluebird'
import User from './User'
import Submission from './Submission'
import dotenv from 'dotenv'

dotenv.config()

mongoose.Promise = bluebird

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

console.log(`Connected to mongo at ${process.env.MONGO_URL}`)

export {
  User,
  Submission
}
