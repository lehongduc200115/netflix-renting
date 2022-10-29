"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateTransaction_model_1 = require("./updateTransaction.model");
const post = {
    method: 'POST',
    path: `/updateTransaction`,
    options: {
        description: 'Post change state user who paid',
        handler: async (_request, res) => {
            const { userId } = _request.payload;
            await updateTransaction_model_1.RuleEngineModel
                .findOneAndUpdate({ userId: userId }, { state: "true" });
            return res.response({}).code(201);
        },
    }
};
const ruleEngineController = [
    post
];
exports.default = ruleEngineController;
//# sourceMappingURL=updateTransaction.controller.js.map