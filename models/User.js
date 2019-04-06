import mongoose, { Schema } from 'mongoose'

let User = mongoose.model('User', new Schema({
  email: { type: String, unique: true, required: [true, 'Email requrido'] },
  username: { type: String, unique: true, required: [true, 'Username requrido'] },
  password: { type: String, required: [true, 'Password requrida'] },
  moderator: { type: Boolean, default: false }
}))

export default User