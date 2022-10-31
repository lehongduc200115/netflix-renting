"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTransaction_model_1 = require("./addTransaction.model");
;
const buyHistory_model_1 = require("../history/buyHistory.model");
const post = {
    method: "POST",
    path: `/addTransaction`,
    options: {
        description: "Post add user who paid",
        handler: async (_request, res) => {
            const { username, id, name, price } = _request.payload;
            console.log(`id vao: ${id}`);
            console.log(`typeOfId ${typeof id}`);
            const ress = await buyHistory_model_1.BuyHistoryModel.findOneAndUpdate({ pakageType: id.toString() }, { $inc: { count: 1 } }, { new: true });
            console.log(`ress: ${JSON.stringify(ress)}`);
            const result = await addTransaction_model_1.TransactionModel.create({
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
            return res.response({ username: result === null || result === void 0 ? void 0 : result.username }).code(201);
        },
    },
};
const ruleEngineController = [post];
exports.default = ruleEngineController;
//# sourceMappingURL=addTransaction.controller.js.map