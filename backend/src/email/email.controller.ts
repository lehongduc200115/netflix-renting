import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { Request } from "hapi";
import { AccountModel } from "../account/account.model";
import sendMail from "./email.utils";
import { readFileSync } from "fs";
import AccountRepository from "../account/account.repository";
import { HttpMethod } from "../common/httpConstant";
import constant from "./email.constant";
import { IMailOption } from "./email.interface";

const accountTemplate = (
  email: string,
  password: string
) => `This is your account:
  <br>email: <b>${email}</b>
  <br>password: <b>${password}</b>
  <br>Start your journey <a href="netflix.com"> here! </a>
`;

const verificationTemplate = (email: string) => `Click 
  <a href="localhost:8000/user/verify?email=${encodeURI(email)}"> here! </a>
  to verify your account
`;
// ) => {
//   return readFileSync('../../assets/mail-template/index.html')
// }

const sendAccount: ServerRoute = {
  method: HttpMethod.POST,
  path: `${constant.EMAIL_PATH}/sendAccount`,
  options: {
    description: "Send account detail email",
    handler: async (request: Request, res: ResponseToolkit) => {
      const { email, type } = request.payload as any;
      const account = await AccountRepository.findOneAndUpdateByType(type);
      if (email) {
        const option: IMailOption = {
          to: email,
          subject: constant.ACCOUNT_SUBJECT,
          htmlContent: accountTemplate(account.username, account.password),
        };
        const printOut = sendMail(option);
        console.log(printOut);
      }
      return res.response("success").code(200);
    },
  },
};

const sendVerification: ServerRoute = {
  method: HttpMethod.POST,
  path: `${constant.EMAIL_PATH}/sendVerification`,
  options: {
    description: "Send verification email",
    handler: async (request: Request, res: ResponseToolkit) => {
      const { email } = request.payload as any;
      if (email) {
        const option: IMailOption = {
          to: email,
          subject: constant.VERIFY_SUBJECT,
          htmlContent: verificationTemplate(email),
        };
        const printOut = sendMail(option);
        console.log(printOut);
      }
      return res.response("success").code(200);
    },
  },
};

const sendMailController: ServerRoute[] = [sendAccount, sendVerification];
export default sendMailController;
