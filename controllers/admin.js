import express from 'express'
import { auth, admin_auth, sanitize_input } from '../utils'

let router = express.Router()

router.use(sanitize_input)
router.use(auth)
router.use(admin_auth)

export default router