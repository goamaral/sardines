import mongoose, { Schema } from 'mongoose'

let User = mongoose.model('User', new Schema({
  email: { type: String, unique: true, required: [true, 'Email requrido'] },
  username: { type: String, unique: true, required: [true, 'Username requrido'] },
  password: { type: String, required: [true, 'Password requrida'] },
  is_moderator: { type: Boolean, default: false },
  is_admin: { type: Boolean, default: false }
}))

export default User