import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { Request } from 'hapi';
import { List } from 'lodash';
import { RuleEngineModel } from './user.model';
import { LoginHistoryModel } from '../history/loginhistory.model';

const getList: ServerRoute = {
  method: 'GET',
  path: `/user`,
  options: {
    description: 'Get rules',
    tags: ['api', 'Rule Engine'],
    handler: async (_request: Request, h: ResponseToolkit) => {
      const data = await RuleEngineModel.find({
      });
      return h.response(data).code(200);
    }
  }
};

const get: ServerRoute = {
  method: 'GET',
  path: `/user/{id}`,
  options: {
    description: 'Get rule by id',
    tags: ['api', 'Rule Engine'],
    handler: async (request: Request, h: ResponseToolkit) => {
      const data = await RuleEngineModel.findById(request.params.id);
      return h.response({
        data: data
      }).code(200);
    },
  }
};

const postLogin: ServerRoute = {
  method: 'POST',
  path: `/login`,
  options: {
    description: 'Post login by username, passwd',
    handler: async (_request: Request, res: ResponseToolkit) => {
      const {username, password} = _request.payload as any;
      const users = await RuleEngineModel.findOne({ username: username, password: password }).exec()    
        if (!!users) 
          await LoginHistoryModel.findOneAndUpdate({username: username},{$inc:{count:1} })   
        return res.response({
          username:  users ? users.username : null
          }).code(201); 
    },
  }
};

const postRegister: ServerRoute = {
  method: 'POST',
  path: `/register`,
  options: {
    description: 'Post register by username, passwd',
    // return h.response({
    //   data:"false"
    // }).code(201); 
    handler: async (_request: Request, res: ResponseToolkit) => {
      const {username, password, phone} = _request.payload as any;
      const users = await RuleEngineModel.findOne({ username: username}).exec()
      console.log(`users: ${JSON.stringify(users)}`)
      let doc = null
      if (!users) {
        doc = await RuleEngineModel.create({username: username, password: password, phone: phone})
        await LoginHistoryModel.create({username: username, count: 0})
      }
        return res.response({
          username:  doc ? doc.username : null,
          isExist: !!users
          }).code(201);      
    },
  }
};

const ruleEngineController: ServerRoute[] = [
  getList,
  get,
  postLogin,
  postRegister,
];
export default ruleEngineController;
