import mongoose from 'mongoose'
import bluebird from 'bluebird'
import User from './User'
import Submission from './Submission'

mongoose.Promise = bluebird

const DB_URL = 'mongodb://localhost:27017/gogocat'
mongoose.connect(DB_URL, { useNewUrlParser: true });

console.log(`Connected to mongo at ${DB_URL}`)

export {
  User,
  Submission
}