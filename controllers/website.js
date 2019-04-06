import express from 'express'
import { render_view, hash_password, compare_password } from '../utils'
import routes from '../routes.json'
import { User, Submission } from '../models'

let router = express.Router()

router.get('/', async (_, res) => {
  let recent_submissions = await Submission.find().sort({ created_at: -1 }).limit(6)

  render_view(res, 'website/index', { recent_submissions })
})

router.get('/sign_in', (_, res) => {
  render_view(res, 'website/sign_in', { errors: {} })
})

router.post('/sign_in', async (req, res) => {
  try {
    let user = await User.findOne({ "$or": [{ email: req.body.username }, { username: req.body.username }] })

    if (!compare_password(req.body.password, user.password)) {
      render_view(res, 'website/sign_in', { errors: { password: "Incorrect password" } })
    } else {
      req.session.user_id = user.id
      res.redirect(routes['platform_index'])
    }
  } catch {
    render_view(res, 'website/sign_in', { errors: { password: "Incorrect password" } })
  }
})

router.get('/sign_up', (_, res) => {
  render_view(res, 'website/sign_up', { errors: {} })
})

router.post('/sign_up', async (req, res) => {
  let terms_accepted = req.body.terms_accepted
  let password = req.body.password
  let password_confirmation = req.body.password_confirmation
  let errors = {}

  if (!terms_accepted) errors["terms_accepted"] = "Termos têm que ser aceites"
  if (password.length < 8) errors["password"] = "Password tem que ter pelo menos 8 caracteres"
  if (password != password_confirmation) errors["password_confirmation"] = "Passwords não são iguais"

  let params = {
    username: req.body.username,
    email: req.body.email,
    password: hash_password(password)
  }

  try {
    let user = await User.create(params)

    if (Object.keys(errors).length) {
      render_view(res, 'website/sign_up', { errors })
    } else {
      req.session.user_id = user.id
      res.redirect(routes['platform_index'])
    }
  } catch (err) {
    if (err.errors) {
      Object.keys(err.errors).forEach(e => {
        errors[e] = err.errors[e].message
      })
    } else {
      errors["email"] = errors["username"] = "Utilizador já esxite"
    }

    render_view(res, 'website/sign_up', { errors })
  }
})

router.get('/submission/:slug', async (req, res) => {
  try {
    let submission = await Submission.findOne({ slug: req.params.slug })
    render_view(res, 'website/submission', { submission })
  } catch {
    render_view(res, 'website/submission', { submission: false })
  }
})

export default router