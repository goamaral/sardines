import express from 'express'
import { auth, admin_auth, sanitize_input, render_view, url_for } from '../utils'
import { User } from '../models'

let router = express.Router()

router.use(sanitize_input)
router.use(auth)
router.use(admin_auth)

/* ADMIN INDEX */
router.get('/', (_, res) => {
  render_view(res, 'admin/index')
})

/* ADMIN USERS INDEX */
router.get('/users', async (_, res) => {
  let users = await User.find().sort({ created_at: -1 })
  render_view(res, 'admin/users/index', { users })
})

/* ADMIN USERS SHOW */
router.get('/users/:username', async (req, res) => {
  let user = await User.findOne({ username: req.params.username })

  if (user) {
    render_view(res, 'admin/users/show', { user })
  } else {
    res.redirect('/admin/users')
  }
})

/* ADMIN USERS EDIT */
router.get('/users/edit/:username', async (req, res) => {
  let user = await User.findOne({ username: req.params.username })

  if (user) {
    render_view(res, 'admin/users/edit', {
      user: { username: user.username, email: user.email, role: user.role, original_username: user.username },
      User,
      errors: {}
    })
  } else {
    res.redirect('/admin/users')
  }
})

/* ADMIN USERS UPDATE */
router.post('/users/edit/:username', async (req, res) => {
  let errors = {}
  let params = {
    username: req.body.username,
    email: req.body.email,
    role: req.body.role
  }

  try {
    await User.updateOne({ username: req.params.username }, params, { runValidators: true })
    
    res.redirect(url_for('admin_users'))
  } catch(err) {
    if (err.errors) {
      Object.keys(err.errors).forEach(e => {
        errors[e] = err.errors[e].message
      })
    } else {
      errors["username"] = "Unknow error"
    }

    render_view(res, 'admin/users/edit', {
      user: { username: params.username, email: params.email, role: params.role, original_username: req.params.username },
      User,
      errors
    })
  }
})

export default router