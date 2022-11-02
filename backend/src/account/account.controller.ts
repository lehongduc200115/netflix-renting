import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { Request } from "hapi";
import { AccountModel } from "./account.model";
import constant from "./account.constant";
import { HttpMethod, HttpStatus } from "../common/httpConstant";
import { SortTypeEnum } from "../common/enum";
import { findOneByType } from './account.repository'

const getAvailable: ServerRoute = {
  method: HttpMethod.PUT,
  path: `/${constant}`,
  options: {
    description: "Get account wheather it available",
    handler: async (request: Request, res: ResponseToolkit) => {
      const { type } = request.payload as any;
      const account = await findOneByType(type)
      return res.response({found: !!account.username}).code(HttpStatus.OK);
    },
  },
};

const post: ServerRoute = {
  method: HttpMethod.POST,
  path: `/${constant}`,
  options: {
    description: "Create a new account",
    handler: async (request: Request, res: ResponseToolkit) => {
      const body = request.payload as any;
      const acc = await AccountModel.create({
        username: body.username || "netflixUsername1",
        password: body.password || "netflixPwd1",
        email: body.email || "lehongduc2001151@gmail.com",
        slot: body.slot || 4,
      });
      return res.response({}).code(HttpStatus.CREATED);
    },
  },
};

const get: ServerRoute = {
  method: HttpMethod.GET,
  path: `/${constant}`,
  options: {
    description: "Get accounts",
    handler: async (_request: Request, res: ResponseToolkit) => {
      const accounts = await AccountModel.find({}).sort({createdAt: SortTypeEnum.DESCENDING});
      return res.response({accounts: accounts}).code(HttpStatus.OK);
    },
  },
};

const accountController: ServerRoute[] = [post, getAvailable, get];
export default accountController;
