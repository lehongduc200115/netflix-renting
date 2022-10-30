import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { Request } from "hapi";
import { RuleEngineModel } from "./addTransaction.model";
import { LoginHistoryModel } from '../history/loginhistory.model';
import { BuyHistoryModel } from '../history/buyHistory.model';

const post: ServerRoute = {
  method: "POST",
  path: `/addTransaction`,
  options: {
    description: "Post add user who paid",
    handler: async (_request: Request, res: ResponseToolkit) => {
      const { username, id, name, price } = _request.payload as any;
      const result = await RuleEngineModel.create({
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
        
      await LoginHistoryModel.findOneAndUpdate({username: username},{$inc:{count:1} })
      await BuyHistoryModel.findOneAndUpdate({id: id},{$inc:{count:1} })

      return res.response({ username: result?.username }).code(201);
    },
  },
};

const ruleEngineController: ServerRoute[] = [post];
export default ruleEngineController;
