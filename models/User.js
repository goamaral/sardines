import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const roles = [
  "ADMIN",
  "MODERATOR",
  "REGULAR"
]

const role_id = (role_name) => roles.indexOf(role_name)

const schema = new Schema({
  email: { type: String, unique: true, required: [true, 'Email requerido'] },
  username: { type: String, unique: true, required: [true, 'Username requerido'] },
  password: { type: String, required: [true, 'Password requrida'], minlength: [8, "Password tem que ter pelo menos 8 caracteres"] },
  role: { type: Number, default: role_id("REGULAR"), enum: [roles, "Role inválida"] },
  terms_accepted: { type: Boolean, required: [true, "Termos têm que ser aceites"], default: false }
})

schema.statics.roles = roles
schema.statics.role_id = role_id
schema.statics.roles = function() {
  let role_mapping = {}
  
  roles.forEach(role => {
    role_mapping[role] = role_id(role)
  })

  return role_mapping
}

schema.methods.role_name = function() { return roles[this.role] }
schema.methods.is_admin = function() { return this.role == role_id("ADMIN") }
schema.methods.is_moderator = function() { return this.role == role_id("MODERATOR") }


const model = mongoose.model('User', schema)

export default class User {

  static roles = roles
  static role_id = role_id
  static model = model
  static SALT_ROUNDS = 10

  errors = {}
  params = {}
  model_instance = null

  constructor(params) {
    params = params
    model_instance = new model(params)
  }

  valid_sign_up() {
    try {
      this.model_instance.validate()
      if (params.password != params.password_confirmation) errors["password_confirmation"] = "Passwords não são iguais"
    } catch (e) {
      
    }
  }

  hash_password() {
    return bcrypt.hashSync(password, SALT_ROUNDS)
  }

  compare_password(password, encrypted) {
    return bcrypt.compareSync(password, encrypted)
  }
}