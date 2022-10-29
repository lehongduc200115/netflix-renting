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
      console.log(`usrname: ${username}`)
      const paid = await RuleEngineModel.find({username:username}).sort({createdAt: -1}).exec()
      return res.response({
        paid: paid[0]?.state
      }).code(201);
    },
  }
};
const post1: ServerRoute = {
  method: 'POST',
  path: '/getTransactions',
  options: {
    description: 'Post change state user who paid',
    handler: async (_request: Request, res: ResponseToolkit) => {      
      // const { username } = _request.payload as any;
      const transactions = await RuleEngineModel.find().sort({createdAt:-1}).limit(20).exec()
      return res.response({
        transactions: transactions
      }).code(201);
    },
  }
};

const getTransactionController: ServerRoute[] = [
  post,
  post1
];
export default getTransactionController;
