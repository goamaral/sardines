import connection, { User } from './models'
import { hash_password } from './utils'

async function generate_users() {
  console.log('Generate Users')
  await User.create({ email: 'admin@email.com', username: 'admin', password: hash_password('adminsecret'), role: User.role_id("ADMIN") })
  await User.create({ email: 'moderator@email.com', username: 'moderator', password: hash_password('moderatorsecret'), role: User.role_id("MODERATOR") })
  await User.create({ email: 'user@email.com', username: 'user', password: hash_password('usersecret') })
}

(async () => {
  // Clear database
  connection.dropDatabase()

  // Create Users
  try {
    await generate_users()
  } catch(err) {
    console.log(err)
  }

  process.exit()
})()