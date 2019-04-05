import express from 'express'
import { render_view } from '../utils'
import routes from '../routes.json'

let router = express.Router()

router.get(routes['website_index'], (_, res) => {
  render_view(res, 'website/index')
})

router.get(routes['website_sign_in'], (_, res) => {
  render_view(res, 'website/sign_in')
})

router.post(routes['website_sign_in'], (req, res) => {
  res.send(req.body)
})

router.get(routes['website_sign_up'], (_, res) => {
  render_view(res, 'website/sign_up')
})

export default router