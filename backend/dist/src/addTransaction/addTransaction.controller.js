"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTransaction_model_1 = require("./addTransaction.model");
const loginhistory_model_1 = require("../history/loginhistory.model");
const buyHistory_model_1 = require("../history/buyHistory.model");
const post = {
    method: "POST",
    path: `/addTransaction`,
    options: {
        description: "Post add user who paid",
        handler: async (_request, res) => {
            const { username, id, name, price } = _request.payload;
            const result = await addTransaction_model_1.RuleEngineModel.create({
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
            await loginhistory_model_1.LoginHistoryModel.findOneAndUpdate({ username: username }, { $inc: { count: 1 } });
            await buyHistory_model_1.BuyHistoryModel.findOneAndUpdate({ id: id }, { $inc: { count: 1 } });
            return res.response({ username: result === null || result === void 0 ? void 0 : result.username }).code(201);
        },
    },
};
const ruleEngineController = [post];
exports.default = ruleEngineController;
//# sourceMappingURL=addTransaction.controller.js.map