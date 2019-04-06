import express from 'express'
import controllers from './controllers'
import db from './models'

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use('/', controllers.website)
app.on('close', () => db.disconnect())
app.listen(3000)

console.log("Listening on port 3000")

export default app
