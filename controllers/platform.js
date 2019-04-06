import express from 'express'
import { render_view } from '../utils'

let router = express.Router()

router.get('/', (_, res) => {
  render_view(res, 'platform/index')
})

router.get('/submission', (_, res) => {
  render_view(res, 'platform/submission')
})

export default router