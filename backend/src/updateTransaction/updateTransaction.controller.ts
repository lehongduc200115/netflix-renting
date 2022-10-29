import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { Request } from 'hapi';
import { RuleEngineModel } from '../addTransaction/addTransaction.model';

import mongoose, { Document, Model, Schema } from 'mongoose';

const post: ServerRoute = {
  method: 'POST',
  path: `/updateTransaction`,
  options: {
    description: 'Post change state user who paid',
    handler: async (_request: Request, res: ResponseToolkit) => {      
      const { userId } = _request.payload as any;
      await RuleEngineModel
        .findOneAndUpdate({userId:userId},{state:"true"})




      return res.response({}).code(201);
    },
  }
};

const ruleEngineController: ServerRoute[] = [
  post
];
export default ruleEngineController;
