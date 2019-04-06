import mongoose from 'mongoose'
import User from './User'

const DB_URL = 'mongodb://localhost:27017/gogocat'
mongoose.connect(DB_URL, { useNewUrlParser: true });

console.log(`Connected to mongo at ${DB_URL}`)

export {
  User
}