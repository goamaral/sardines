import { User } from './models'

(async () => {
  // Create Users
  try {
    console.log('Creating Admin')
    await User.create({ email: 'admin@email.com', username: 'admin', password: 'adminsecret', is_moderator: true, is_admin: true })
    console.log('Creating Moderator')
    await User.create({ email: 'moderator@email.com', username: 'moderator', password: 'moderatorsecret', is_moderator: true })
    console.log('Creating User')
    await User.create({ email: 'user@email.com', username: 'user', password: 'usersecret' })
  } catch(err) {
    console.log(err)
  }
})()