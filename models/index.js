import mongoose from 'mongoose'
import bluebird from 'bluebird'
import User from './User'
import Submission from './Submission'
import dotenv from 'dotenv'

dotenv.config()

mongoose.Promise = bluebird

const connection = mongoose.createConnection(process.env.MONGO_URL, { useNewUrlParser: true });
connection.on('connected', () => console.log(`Connected to MongoDB at ${process.env.MONGO_URL}`))
connection.on('error', err => console.log(`Failed to connect to MongoDB (${err})`))

export default {
  User,
  Submission
}

export {
  connection
}