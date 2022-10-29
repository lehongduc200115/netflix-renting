import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { Request } from 'hapi';
import { RuleEngineModel } from './addTransaction.model';

const post: ServerRoute = {
  method: 'POST',
  path: `/addTransaction`,
  options: {
    description: 'Post add user who paid',
    handler: async (_request: Request, res: ResponseToolkit) => {
      const { username, package1, amount } = _request.payload as any;
      const result = await RuleEngineModel
        .create({ username: username, package1: package1, amount: amount, state: "false" })
        .then()
        .catch(_err => { console.log("Network error!add transaction controller") })
      return res.response({username: result?.username}).code(201);
    },
  }
};

const ruleEngineController: ServerRoute[] = [
  post
];
export default ruleEngineController;
