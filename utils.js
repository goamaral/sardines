import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import routes from './routes.json'
import User from './models/User.js'
import sanitizer from 'mongo-sanitize'

const render_view = (res, slug, view_props={}) => {
  const view_file_path = path.join(__dirname, 'views', slug + '.ejs')
  const view_file = fs.readFileSync(view_file_path, 'utf-8');
  const default_props = { slug, routes, url_for }
  const content = ejs.render(view_file, { ...default_props, ...view_props })
  const layout_file_path = path.join(__dirname, 'views', slug.split("/")[0], 'layout' + '.ejs')

  ejs.renderFile(layout_file_path, { content, ...default_props }, (_, data) => {
    res.send(data)
  })
}

const auth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect(routes['website_sign_in'])
  } else {
    next()
  }
}

const admin_auth = async (req, res, next) => {
  let user = await User.findOne({ _id: req.session.user_id })
  if (!user || !user.is_admin()) {
    res.redirect(routes['website_sign_in'])
  } else {
    next()
  }
}

const sanitize_input = (req, _, next) => {
  req.body = sanitizer(req.body)
  next()
}

const url_for = (route, id = '', params = {}) => {
  let serialized_params = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')

  return routes[route] + (id.length == 0 ? '' : '/' + id) + (serialized_params.length == 0 ? '' : '?' + serialized_params)
}

const on_404_page = (_, res, __) => {
  render_view(res, "website/404")
}

export {
  render_view, auth, admin_auth, sanitize_input, url_for,
  on_404_page
}