import mailer from '@sendgrid/mail'
import env from './env.json'

mailer.setApiKey(env.sendgrid_key)

let default_mailer_options = {
  from: env.mailer_sender_email
}

const send_forgot_password_email = (email, password) => {
  mailer.send({
    ...default_mailer_options, to: email,
    subject: "Recuperar password",
    text: `A tua nova password é ${password}`
  })
}

export { send_forgot_password_email }