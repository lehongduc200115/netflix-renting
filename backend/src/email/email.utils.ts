
import nodeMailer from 'nodemailer';
import config from '../config'
import { IMailOption } from './email.interface';
import constant from './email.constant'

const sendMail: any = (option: IMailOption) => {
  const transport = nodeMailer.createTransport({
      host: constant.MAIL_HOST,
      port: constant.MAIL_PORT,
      secure: false,
      auth: {
          user: config.mailUsername,
          pass: config.mailPassword,
      }
  })

  const options = {
      from: constant.MAIL_FROM_ADDRESS,
      to: option.to,
      subject: option.subject,
      html: option.htmlContent
  }
  return transport.sendMail(options);
}

export default sendMail; 