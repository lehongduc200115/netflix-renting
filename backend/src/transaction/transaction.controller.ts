import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { Request } from "hapi";
import { TransactionModel } from "./transaction.model";;
import { BuyHistoryModel } from '../history/buyHistory.model';
import constant from './transaction.constant'
import { HttpMethod } from "../common/httpConstant";

const post: ServerRoute = {
  method: "POST",
  path: `/${constant.TRANSACTION_PATH}`,
  options: {
    description: "Post add user who paid",
    auth: 'jwt',
    handler: async (request: Request, res: ResponseToolkit) => {
      const { email, id, name, price } = request.payload as any;
      console.log(`id vao: ${id}`)
      console.log(`typeOfId ${typeof id}`)
      const ress = await BuyHistoryModel.findOneAndUpdate({pakageType: id.toString()},{$inc:{count:1} }, {new:true})
      console.log(`ress: ${JSON.stringify(ress)}`)
      const result = await TransactionModel.create({
        id,
        email,
        name,
        price,
        state: "false",
      })
        .then()
        .catch((_err: any) => {
          console.log("Network error!add transaction controller");
        });
      // await BuyHistoryModel.findOneAndUpdate({packageType: id},{$inc:{count:1} }, {new:true})
      // console.log(`ress: ${JSON.stringify(ress)}`)
      return res.response({ email: result?.email }).code(201);
    },
  },
};

const getByEmail: ServerRoute = {
  method: HttpMethod.GET,
  path: `/${constant.TRANSACTION_PATH}/{email}`,
  options: {
    description: 'Get transaction by email',
    handler: async (request: Request, res: ResponseToolkit) => {      
      const { email } = request.params as any;
      console.log(`usrname: ${email}`)
      const paid = await TransactionModel.find({email:email}).sort({createdAt: -1}).exec()
      return res.response({
        paid: paid[0]?.state
      }).code(201);
    },
  }
};

const getList: ServerRoute = {
  method: HttpMethod.GET,
  path: `/${constant.TRANSACTION_PATH}`,
  options: {
    description: 'Get list of transaction',
    handler: async (_request: Request, res: ResponseToolkit) => {      
      // const { email } = request.payload as any;
      const transactions = await TransactionModel.find().sort({createdAt:-1}).limit(20).exec()
      return res.response({
        transactions: transactions
      }).code(201);
    },
  }
};
const putPay: ServerRoute = {
  method: 'PUT',
  path: `/${constant.TRANSACTION_PATH}/pay`,
  options: {
    description: 'Put change state user who paid',
    handler: async (request: Request, res: ResponseToolkit) => {      
      const { transactionId, email } = request.payload as any;
      await TransactionModel
        .findOneAndUpdate({_id:transactionId},{state:"true"})
      return res.response({}).code(201);
    },
  }
};

const transactionController: ServerRoute[] = [
  post,
  getList,
  getByEmail,
  putPay,
];

export default transactionController;
