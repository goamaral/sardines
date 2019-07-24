import express from 'express'
import { render_view, auth, hash_password, sanitize_input } from '../utils'
import routes from '../routes.json'
import { Submission, User } from '../models'

let router = express.Router()

router.use(sanitize_input)
router.use(auth)

router.get('/', (_, res) => {
  render_view(res, 'platform/index', { errors: {} })
})

router.get('/submission', (_, res) => {
  render_view(res, 'platform/submission', { errors: {} })
})

router.post('/submission', async (req, res) => {
  let errors = {}
  let slug = req.body.expression.trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/, "")
    .replace(/\s/g, "_")

  let params = {
    slug,
    expression: req.body.expression,
    description: req.body.description,
    user_id: req.session.user_id
  }

  try {
    await Submission.create(params)
    
    res.redirect(routes['platform_index'])
  } catch(err) {
    if (err.errors) {
      Object.keys(err.errors).forEach(e => {
        errors[e] = err.errors[e].message
      })
    } else {
      errors["expression"] = "Expressão já existe"
    }

    render_view(res, 'platform/submission', { errors })
  }
})

router.get('/password', (_, res) => {
  res.redirect('platform/index')
})

router.post('/password', async (req, res) => {
  let password = req.body.password
  let password_confirmation = req.body.password_confirmation
  let errors = {}

  if (password.length < 8) errors["password_password"] = "Password tem que ter pelo menos 8 caracteres"
  if (password != password_confirmation) errors["password_password_confirmation"] = "Passwords não são iguais"

  try {
    let user = await User.findById(req.session.user_id)
    user.password = hash_password(password)
    user.save()
  } catch {}

  render_view(res, 'platform/index', { errors })
})

router.get('/logout', (req, res) => {
  req.session.user_id = null

  res.redirect(routes["website_index"])
})

export default router
