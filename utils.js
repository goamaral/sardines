import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import routes from './routes.json'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

const render_view = (res, slug, view_props={}) => {
  const view_file_path = path.join(__dirname, 'views', slug + '.ejs')
  const view_file = fs.readFileSync(view_file_path, 'utf-8');
  const content = ejs.render(view_file, { routes, ...view_props })

  const layout_file_path = path.join(__dirname, 'views', slug.split("/")[0], 'layout' + '.ejs')

  ejs.renderFile(layout_file_path, { content, slug, routes }, (_, data) => {
    res.send(data)
  })
}

const hash_password = password => {
  return bcrypt.hashSync(password, SALT_ROUNDS)
}

const compare_password = (password, encrypted) => {
  return bcrypt.compareSync(password, encrypted)
}

const auth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect(routes['website_sign_in'])
  } else {
    next()
  }
}

export { render_view, hash_password, compare_password, auth }