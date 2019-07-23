import express from 'express'
import { auth, admin_auth, sanitize_input, render_view } from '../utils'
import { User } from '../models'

let router = express.Router()

router.use(sanitize_input)
router.use(auth)
router.use(admin_auth)

router.get('/', (_, res) => {
  render_view(res, 'admin/index')
})

router.get('/users', async (_, res) => {
  let users = await User.find().sort({ created_at: -1 })
  render_view(res, 'admin/users/index', { users })
})

router.get('/users/:username', async (req, res) => {
  let user = await User.findOne({ username: req.params.username })

  if (user) {
    render_view(res, 'admin/users/show', { user })
  } else {
    res.redirect('/admin/users')
  }
})

export default router