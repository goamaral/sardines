import express from 'express'
import { render_view, auth } from '../utils'
import routes from '../routes.json'
import { Submission } from '../models'

let router = express.Router()

router.use(auth)

router.get('/', (_, res) => {
  render_view(res, 'platform/index')
})

router.get('/submission', (_, res) => {
  render_view(res, 'platform/submission', { errors: {} })
})

router.post('/submission', async (req, res) => {
  let errors = {}

  let params = {
    expression: req.body.expression,
    description: req.body.description,
    origin: req.body.description,
    user_id: req.session.user_id
  }

  try {
    await Submission.create(params)

    if (Object.keys(errors).length) {
      render_view(res, 'platform/submission', { errors })
    } else {
      res.redirect(routes['platform_index'])
    }
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

export default router
