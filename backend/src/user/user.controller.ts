import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { Request } from "hapi";
import { UserModel } from "./user.model";
import { LoginHistoryModel } from "../history/loginhistory.model";
import { HttpMethod, HttpStatus } from "../common/httpConstant";

import jwt  from 'jsonwebtoken';

const getList: ServerRoute = {
  method: HttpMethod.GET,
  path: `/user`,
  options: {
    description: "Get all users",
    tags: ["api", "User"],
    handler: async (request: Request, h: ResponseToolkit) => {
      const data = await UserModel.find({});
      return h.response(data).code(HttpStatus.OK);
    },
  },
};

const get: ServerRoute = {
  method: HttpMethod.GET,
  path: `/user/{id}`,
  options: {
    description: "Get user by id",
    tags: ["api", "User"],
    handler: async (request: Request, h: ResponseToolkit) => {
      const data = await UserModel.findById(request.params.id);
      return h
        .response({
          data: data,
        })
        .code(200);
    },
  },
};

const login: ServerRoute = {
  method: HttpMethod.POST,
  path: `/login`,
  options: {
    description: "Post login by email, passwd",
    auth: false,
    handler: async (request: Request, res: ResponseToolkit) => {
      const { email, password } = request.payload as any;
      const users = await UserModel.findOne({
        email: email,
        password: password,
      }).exec();
      if (!!users){
        await LoginHistoryModel.findOneAndUpdate(
          { email: email },
          { $inc: { count: 1 } }
        );
        const token = jwt.sign(email, 'TOP_SECRET', { expiresIn: '30m' }) ;
        return res
        .response({
          valid: true,
          token,
        })
        .code(HttpStatus.OK);
      }
      else{
        return res
        .response({
          valid: false,
        })
        .code(HttpStatus.OK);
      }
        
      
    },
  },
};

const register: ServerRoute = {
  method: HttpMethod.POST,
  path: `/register`,
  options: {
    description: "Register new user",
    auth: false,
    handler: async (request: Request, res: ResponseToolkit) => {
      const { email, password, phone } = request.payload as any;
      const users = await UserModel.findOne({ email: email }).exec();
      console.log(`users: ${JSON.stringify(users)}`);
      let doc = null;
      if (!users) {
        doc = await UserModel.create({
          email: email,
          password: password,
          phone: phone,
        });
        await LoginHistoryModel.create({ email: email, count: 0 });
      }
      return res
        .response({
          email: doc ? doc.email : null,
          isExist: !!users,
        })
        .code(HttpStatus.CREATED);
    },
  },
};

const verify: ServerRoute = {
  method: HttpMethod.GET,
  path: `/user/verify`,  
  options: {
    description: "Verify user by emailing",
    auth: 'jwt',
    handler: async (request: Request, res: ResponseToolkit) => {
      const { email } = request.query as any;
      const foundUser = await UserModel.findOneAndUpdate(
        {
          email: email,
          isVerified: false,
        },
        {
          isVerified: true,
        }
      );

      return res
        .response({
          isVerified: !!foundUser,
        })
        .code(HttpStatus.OK);
    },
  },
};

const userController: ServerRoute[] = [getList, get, login, register, verify];
export default userController;
