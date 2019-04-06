import express from 'express'
import { render_view } from '../utils'
import routes from '../routes.json'
import { User } from '../models'
import bcrypt from 'bcrypt'

let router = express.Router()

router.get(routes['website_index'], (_, res) => {
  render_view(res, 'website/index')
})

router.get(routes['website_sign_in'], (_, res) => {
  render_view(res, 'website/sign_in')
})

router.post(routes['website_sign_in'], (req, res) => {
  let callback = (err, user) => {
    if (!user) return res.send("A Incorret password")

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.send("B Incorrect password")
    }

    res.send(user)
  }

  User.findOne({
    "$or": [{ email: req.body.username }, { username: req.body.username }]
  }, callback)
})

router.get(routes['website_sign_up'], (_, res) => {
  render_view(res, 'website/sign_up')
})

router.post(routes['website_sign_up'], async (req, res) => {
  let terms_accepted = req.body.terms_accepted
  let password = req.body.password
  let password_confirmation = req.body.password_confirmation

  if (!terms_accepted) {
    return res.send("Terms not accepted")
  }

  if (password != password_confirmation) {
    return res.send("Passwords dont match")
  }

  let params = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(password, 10)
  }

  User.create(params, (err, user) => {
    if (err) {
      res.send(JSON.stringify(err))
    } else {
      res.send("User created")
    }
  })
})

export default router