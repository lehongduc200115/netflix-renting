import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { Request } from 'hapi';
import { RuleEngineModel } from './addTransaction.model';

const post: ServerRoute = {
  method: 'POST',
  path: `/addTransaction`,
  options: {
    description: 'Post add user who paid',
    handler: async (_request: Request, res: ResponseToolkit) => {
      // const users = await RuleEngineModel.create({ username: username, password: password })
      //   .then(_data => {
      //     console.log(_data)
      //     return _data
      //   }).catch(
      //     _err => {console.log("Network error!")
      //     return {}
      //   }

      //   )

      //   return res.response({
      //       data: (users as Array<any>).length != 0
      //     }).code(201); 
      const { userId, package1, amount } = _request.payload as any;
      await RuleEngineModel
        .create({ userId: userId, package1: package1, amount: amount, state: "false" })
        .then()
        .catch(_err => { console.log("Network error!add transaction controller") })




      return res.response({}).code(201);
    },
  }
};

const ruleEngineController: ServerRoute[] = [
  post
];
export default ruleEngineController;
