import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { Request } from "hapi";
import { TransactionModel } from "./addTransaction.model";;
import { BuyHistoryModel } from '../history/buyHistory.model';

const post: ServerRoute = {
  method: "POST",
  path: `/addTransaction`,
  options: {
    description: "Post add user who paid",
    handler: async (_request: Request, res: ResponseToolkit) => {
      const { username, id, name, price } = _request.payload as any;
      console.log(`id vao: ${id}`)
      console.log(`typeOfId ${typeof id}`)
      const ress = await BuyHistoryModel.findOneAndUpdate({pakageType: id.toString()},{$inc:{count:1} }, {new:true})
      console.log(`ress: ${JSON.stringify(ress)}`)
      const result = await TransactionModel.create({
        id,
        username,
        name,
        price,
        state: "false",
      })
        .then()
        .catch((_err) => {
          console.log("Network error!add transaction controller");
        });
      // await BuyHistoryModel.findOneAndUpdate({packageType: id},{$inc:{count:1} }, {new:true})
      // console.log(`ress: ${JSON.stringify(ress)}`)
      return res.response({ username: result?.username }).code(201);
    },
  },
};

const ruleEngineController: ServerRoute[] = [post];
export default ruleEngineController;
