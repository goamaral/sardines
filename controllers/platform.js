import express from 'express'
import { render_view } from '../utils'
import routes from '../routes.json'

let router = express.Router()

router.use((req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect(routes['website_sign_in'])
  }
  next()
})

router.get('/', (_, res) => {
  render_view(res, 'platform/index')
})

router.get('/submission', (_, res) => {
  render_view(res, 'platform/submission')
})

export default router