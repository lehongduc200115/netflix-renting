import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { Request } from "hapi";
import { AccountModel } from "./account.model";

const post: ServerRoute = {
  method: "POST",
  path: `/getNetflixAcc`,
  options: {
    description: "Post get netflix account",
    handler: async (_request: Request, res: ResponseToolkit) => {
      const acc = await AccountModel.findOne().where("slot").gte(0).exec();
      console.log(`acc: ${JSON.stringify(acc)}`)
      await AccountModel.findOneAndUpdate(
        { email: acc?.email },
        { slot: acc?.slot ? acc?.slot : 0 - 1 }
      );
      return res
        .response({
          username: acc?.username,
          password: acc?.password,
        })
        .code(201);
    },
  },
};

const post2: ServerRoute = {
  method: "POST",
  path: `/addNetFlixAccount`,
  options: {
    description: "Create new netflix account",
    handler: async (_request: Request, res: ResponseToolkit) => {
      const acc = await AccountModel.create({
        username: "netflixUsername1",
        password: "netflixPwd1",
        email: "lehongduc2001151@gmail.com",
        slot: 5
      });
      return res.response({}).code(201);
    },
  },
};

const getNetflixAccController: ServerRoute[] = [post, post2];
export default getNetflixAccController;
