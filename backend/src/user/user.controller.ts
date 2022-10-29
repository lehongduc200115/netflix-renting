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
        data:data
      }).code(200);
    },
  }
};

const post: ServerRoute = {
  method: 'POST',
  path: `/user`,
  options: {
    description: 'Post rule by id',
    tags: ['api', 'Rule Engine'],
    handler: async (_request: Request, h: ResponseToolkit) => {
      RuleEngineModel.create({ name: 'small' });
      return h.response({
        data:"da tao"
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
