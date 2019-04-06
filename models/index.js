import mongoose from 'mongoose'
import bluebird from 'bluebird'
import User from './User'
import Submission from './Submission'
import env from '../env.json'

mongoose.Promise = bluebird

mongoose.connect(env["mongo_url"], { useNewUrlParser: true });

console.log(`Connected to mongo at ${env["mongo_url"]}`)

export {
  User,
  Submission
}
