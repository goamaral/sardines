import mongoose, { Schema } from 'mongoose'

let User = mongoose.model('User', new Schema({
  email: { type: String, unique: true, required: [true, 'Email required'] },
  username: { type: String, unique: true, required: [true, 'Username required'] },
  password: { type: String, required: [true, 'Password required'] }
}))

export default User