import express from 'express'
import { render_view, hash_password, compare_password } from '../utils'
import routes from '../routes.json'
import { User } from '../models'

let router = express.Router()

router.get('/', (_, res) => {
  render_view(res, 'website/index')
})

router.get('/sign_in', (_, res) => {
  render_view(res, 'website/sign_in', { errors: {} })
})

router.post('/sign_in', (req, res) => {
  let callback = (err, user) => {
    if (!user) return render_view(res, 'website/sign_in', { errors: { password: "Incorrect password" } })

    if (!compare_password(req.body.password, user.password)) {
      return render_view(res, 'website/sign_in', { errors: { password: "Incorrect password" } })
    }

    res.redirect(routes['platform_index'])
  }

  User.findOne({
    "$or": [{ email: req.body.username }, { username: req.body.username }]
  }, callback)
})

router.get('/sign_up', (_, res) => {
  render_view(res, 'website/sign_up', { errors: {} })
})

router.post('/sign_up', (req, res) => {
  let terms_accepted = req.body.terms_accepted
  let password = req.body.password
  let password_confirmation = req.body.password_confirmation
  let errors = {}

  if (!terms_accepted) errors["terms_accepted"] = "Terms not accepted"
  if (password.length < 8) errors["password"] = "Password must be at least 8 characters long"
  if (password != password_confirmation) errors["password_confirmation"] = "Passwords don't match"

  let params = {
    username: req.body.username,
    email: req.body.email,
    password: hash_password(password)
  }

  User.create(params, (err, user) => {
    if (err) {
      if (err.errors) {
        Object.keys(err.errors).forEach(e => {
          errors[e] = err.errors[e].message
        })
      } else {
        errors["email"] = errors["username"] = "User already exists"
      }
    }

    if (Object.keys(errors).length) {
      render_view(res, 'website/sign_up', { errors })
    } else {
      res.redirect(routes['platform_index'])
    }
  })
})

export default router