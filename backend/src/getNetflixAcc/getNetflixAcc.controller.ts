import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { Request } from 'hapi';
import { RuleEngineModel } from './addNetflixAcc.model';


const post: ServerRoute = {
  method: 'POST',
  path: `/getNetflixAcc`,
  options: {
    description: 'Post get netflix account',
    handler: async (_request: Request, res: ResponseToolkit) => {
      const acc = await RuleEngineModel
      .findOne().where('slot').gte(0).exec()     
     await RuleEngineModel.findOneAndUpdate(
          {username:acc?.username}, 
          {slot:(acc?.slot ? acc?.slot : 0 -1)})
      return res.response({        
        accName: acc?.accName,
        accPwd: acc?.accPwd
      }).code(201);
    },
  }
};

const ruleEngineController: ServerRoute[] = [
  post
];
export default ruleEngineController;
