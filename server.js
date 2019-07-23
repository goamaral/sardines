import express from 'express'
import controllers from './controllers'
import db from './models'
import dotenv from 'dotenv'
import session from 'express-session'
import redis_store, { client as redis_client } from './redis'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

app.set('view engine', 'ejs')
app.set('views', './views')
app.set('trust proxy', 1)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(session({
  name: 'sardines',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.ENV == "production" },
  store: redis_store
}))

// Routing
app.use('/', controllers.website)
app.use('/platform', controllers.platform)
app.use('/admin', controllers.admin)

app.on('close', () => {
  redis_client.quit()
  db.close()
})

app.listen(port, host)

console.log("Started server at", `${host}:${port}`)

export default app
