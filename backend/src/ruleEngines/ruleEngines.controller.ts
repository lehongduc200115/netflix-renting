import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { Request } from 'hapi';
import constant from './ruleEngines.constant';
import {
  IExtractListRequest,
  IRuleEngineRequest
} from './ruleEngines.interface';
import ruleEngineService from './ruleEngines.service';

const getList: ServerRoute = {
  method: 'GET',
  path: `/${constant.RULES_PATH}`,
  options: {
    description: 'Get rules',
    tags: ['api', 'Rule Engine'],
    handler: async (request: Request, h: ResponseToolkit) => {
      const data = await ruleEngineService.getList({
        ...request.query
      });
      return h.response(data).code(200);
    }
  }
};

const get: ServerRoute = {
  method: 'GET',
  path: `/${constant.RULES_PATH}/{id}`,
  options: {
    description: 'Get rule by id',
    tags: ['api', 'Rule Engine'],
    handler: async (request: Request, h: ResponseToolkit) => {
      const data = await ruleEngineService.getById(request.params.id);
      return h.response(data.toObject()).code(200);
    },
  }
};

const ruleEngineController: ServerRoute[] = [
  getList,
  get,
];
export default ruleEngineController;
