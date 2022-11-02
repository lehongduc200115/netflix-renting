
import nodeMailer from 'nodemailer';
import config from '../config'
import { IMailOption } from './sendMail.interface';

const constant = {
  MAIL_MAILER:"smtp",
  MAIL_HOST:"smtp.gmail.com",
  MAIL_PORT:587,
  MAIL_USERNAME: config.mailUsername,
  MAIL_PASSWORD: config.mailPassword,
  MAIL_ENCRYPTION:"TLS",
  MAIL_FROM_ADDRESS:"lehongduc2001151@gmail.com",
  MAIL_FROM_NAME:"Renting account",

  SUBJECT:"[Netflix account] Thank you for your purchase!"
}

const sendMail: any = (to: string, htmlContent: string) => {
  console.log(`config.mailUsername: ${config.mailUsername}`)
  console.log(`config.mailPassword: ${config.mailPassword}`)
  const transport = nodeMailer.createTransport({
      host: constant.MAIL_HOST,
      port: constant.MAIL_PORT,
      secure: false,
      auth: {
          user: constant.MAIL_USERNAME,
          pass: constant.MAIL_PASSWORD,
      }
  })

  const options: IMailOption = {
      from: constant.MAIL_FROM_ADDRESS,
      to: to,
      subject: constant.SUBJECT,
      html: htmlContent
  }
  return transport.sendMail(options);
}

export default sendMail; 