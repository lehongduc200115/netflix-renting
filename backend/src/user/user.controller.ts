import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { Request } from 'hapi';
import { RuleEngineModel } from './user.model';

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

const post: ServerRoute = {
  method: 'POST',
  path: `/login`,
  options: {
    description: 'Post login by username, passwd',
    // return h.response({
    //   data:"false"
    // }).code(201); 
    handler: async (_request: Request, res: ResponseToolkit) => {
      const {username, password} = _request.payload as any;
      const users = await RuleEngineModel.find({ username: username, password: password })
        .then(_data => {
          console.log(_data)
          return _data
        }).catch(
          _err => {console.log("Network error!")
          return {}
        }
          
        )

        return res.response({
            data: (users as Array<any>).length != 0
          }).code(201); 
      


    },
  }
};

const ruleEngineController: ServerRoute[] = [
  getList,
  get,
  post
];
export default ruleEngineController;
