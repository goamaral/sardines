import mongoose, { Schema } from 'mongoose'

const roles = [
  "ADMIN",
  "MODERATOR",
  "REGULAR"
]

const role_id =  function(role_name) {
  return roles.indexOf(role_name)
}

const schema = new Schema({
  email: { type: String, unique: true, required: [true, 'Email requerido'] },
  username: { type: String, unique: true, required: [true, 'Username requerido'] },
  password: { type: String, required: [true, 'Password requrida'] },
  role: { type: Number, default: role_id("REGULAR") },
})

schema.statics.roles = roles
schema.statics.role_id = role_id
schema.methods.role_name = function() { return roles[this.role] }
schema.methods.is_admin = function() { return this.role == role_id("ADMIN") }
schema.methods.is_moderator = function() { return this.role == role_id("MODERATOR") }

export default mongoose.model('User', schema)