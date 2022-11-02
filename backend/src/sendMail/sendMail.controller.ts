import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { Request } from "hapi";
import { RuleEngineModel } from "../account/account.model";
import sendMail from "./sendMail.utils";
import {readFileSync} from 'fs'

const mailTemplate = (
  email: string,
  password: string
) => `This is your account:
  <br>email: <b>${email}</b>
  <br>password: <b>${password}</b>
  <br>Start your journey <a href="netflix.com"> here! </a>
`;
// ) => {
//   return readFileSync('../../assets/mail-template/index.html')
// }

const post: ServerRoute = {
  method: "POST",
  path: `/sendMail`,
  options: {
    description: "Send email to email",
    handler: async (request: Request, res: ResponseToolkit) => {
      const { email } = request.payload as any;

      const acc = await RuleEngineModel.findOne().where("slot").gte(0).exec();
      if (acc) {
        await RuleEngineModel.findOneAndUpdate(
          { email: acc?.email },
          { slot: acc?.slot ? acc?.slot : 0 - 1 }
        );
        const printOut = sendMail(
          email,
          mailTemplate(acc.email, acc.password)
        );
        console.log(printOut);
      }
      return res.response("success").code(200);
    },
  },
};

const sendMailController: ServerRoute[] = [post];
export default sendMailController;
