import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { Request } from 'hapi';
import { List } from 'lodash';
import { LoginHistoryModel } from './loginhistory.model';
import { BuyHistoryModel } from './buyHistory.model';
import{ PACKAGE1} from './package.constant'


const postInitHistory: ServerRoute = {
  method: 'POST',
  path: `/initHistory`,
  options: {
    description: 'Post get login history',
    auth: 'jwt',
    handler: async (_request: Request, res: ResponseToolkit) => {
     // const {email} = request.payload as any;
       await BuyHistoryModel.create({pakageType:1,count:0})
       await BuyHistoryModel.create({pakageType:2,count:0})
       await BuyHistoryModel.create({pakageType:3,count:0})
       await BuyHistoryModel.create({pakageType:7,count:0})
       await BuyHistoryModel.create({pakageType:30,count:0})
        return res.response({
          }).code(201);
    },
  }
};


const postHistory: ServerRoute = {
  method: 'POST',
  path: `/getLoginHistory`,
  options: {
    description: 'Post get login history',
    auth: 'jwt',
    handler: async (_request: Request, res: ResponseToolkit) => {
     // const {email} = request.payload as any;
      const data = await LoginHistoryModel.find().limit(20).exec()      
        return res.response({          
          data: data
          }).code(201);
    },
  }
};

const postBuyHistory: ServerRoute = {
  method: 'POST',
  path: `/getBuyHistory`,
  options: {
    description: 'Post get buy history',
    auth: 'jwt',
    handler: async (_request: Request, res: ResponseToolkit) => {
     // const {email} = request.payload as any;
      const data = await BuyHistoryModel.find().limit(20).exec()      
      console.log("1")
        return res.response({
          
          [PACKAGE1.ONEDAY.id]: data[0].count,
          [PACKAGE1.TWODAYS.id]: data[1].count,
          [PACKAGE1.THREEDAYS.id]: data[2].count,
          [PACKAGE1.WEEK.id]: data[3].count,
          [PACKAGE1.MONTH.id]: data[4].count,
          
        }).code(201);   
          
    },
  }
};

const ruleEngineController: ServerRoute[] = [
  postHistory,
  postInitHistory,
  postBuyHistory
];
export default ruleEngineController;
