import mailer from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

mailer.setApiKey(process.env.SENDGRID_KEY)

let default_mailer_options = {
  from: {
    name: process.env.MAILER_NAME_FROM,
    email: process.env.MAILER_EMAIL_FROM
  }
}

const send_forgot_password_email = (email, password) => {
  mailer.send({
    ...default_mailer_options, to: email,
    subject: "Recuperar password",
    text: `A tua nova password é ${password}`
  })
}

const send_sign_up_thanks_email = email => {
  mailer.send({
    ...default_mailer_options, to: email,
    subject: "Obrigado pelo registo!",
    text: `A equipa do Almanaque da Sardinha agradece o teu registo.`
  })
}

export { send_forgot_password_email, send_sign_up_thanks_email }