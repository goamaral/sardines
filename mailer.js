import mailer from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

mailer.setApiKey(process.env.SENDGRID_KEY)

let default_mailer_options = {
  from: process.env.MAILER_FROM
}

const send_forgot_password_email = (email, password) => {
  mailer.send({
    ...default_mailer_options, to: email,
    subject: "Recuperar password",
    text: `A tua nova password é ${password}`
  })
}

export { send_forgot_password_email }