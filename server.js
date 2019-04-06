import express from 'express'
import controllers from './controllers'
import db from './models'
import session from 'express-session'
import mongoose from 'mongoose'

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.set('trust proxy', 1)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(session({
  secret: 'gogocat',
  resave: false,
  saveUninitialized: true,
  user_id: mongoose.Types.ObjectId("5ca8c675dc59c21e25fafec4")
}))

// Routing
app.use('/', controllers.website)
app.use('/platform', controllers.platform)

app.on('close', () => db.disconnect())
app.listen(3000)

console.log("Listening on port 3000")

export default app
