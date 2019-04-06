import express from 'express'
import controllers from './controllers'
import db from './models'
//import session from './express-session'

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use('/', controllers.website)
app.use('/platform', controllers.platform)
app.on('close', () => db.disconnect())
app.listen(3000)

console.log("Listening on port 3000")

export default app
