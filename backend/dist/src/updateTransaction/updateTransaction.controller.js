"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTransaction_model_1 = require("../addTransaction/addTransaction.model");
const post = {
    method: 'POST',
    path: `/updateTransaction`,
    options: {
        description: 'Post change state user who paid',
        handler: async (_request, res) => {
            const { transactionId, username } = _request.payload;
            await addTransaction_model_1.TransactionModel
                .findOneAndUpdate({ _id: transactionId }, { state: "true" });
            return res.response({}).code(201);
        },
    }
};
const ruleEngineController = [
    post
];
exports.default = ruleEngineController;
//# sourceMappingURL=updateTransaction.controller.js.map