import express from 'express'
import controllers from './controllers'

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded())
app.use(express.static('public'))
app.use('/', controllers.website)
app.listen(3000)

console.log("Listening on port 3000")

export default app
