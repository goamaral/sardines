import express from 'express'
import { render_view, auth } from '../utils'
import routes from '../routes.json'

let router = express.Router()

router.use(auth)

router.get('/', (_, res) => {
  render_view(res, 'platform/index')
})

router.get('/submission', (_, res) => {
  render_view(res, 'platform/submission')
})

export default router