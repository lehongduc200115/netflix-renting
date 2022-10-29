import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { Request } from 'hapi';
import { RuleEngineModel } from '../addTransaction/addTransaction.model';


const post: ServerRoute = {
  method: 'POST',
  path: `/getTransaction`,
  options: {
    description: 'Post change state user who paid',
    handler: async (_request: Request, res: ResponseToolkit) => {      
      const { username } = _request.payload as any;
      const paid = await RuleEngineModel.findOne({username:username}).exec()
      return res.response({
        paid: paid
      }).code(201);
    },
  }
};

const ruleEngineController: ServerRoute[] = [
  post
];
export default ruleEngineController;
