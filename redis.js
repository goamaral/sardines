import session from 'express-session'
import redis from 'redis'
import bind_to_redis from 'connect-redis'
import dotenv from 'dotenv'
import bluebird from 'bluebird'

dotenv.config()
bluebird.promisifyAll(redis)

const client = redis.createClient()
const Store = bind_to_redis(session)
const config = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  client
}

client.on('connect', () => console.log(`Connected to Redis at ${config.host}:${config.port}`))
client.on('error', err => console.log(`Failed to connect to redis (${err})`))

export default new Store(config)

export {
  client
}