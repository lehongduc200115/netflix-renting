"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTransaction_model_1 = require("../addTransaction/addTransaction.model");
const post = {
    method: 'POST',
    path: `/getTransaction`,
    options: {
        description: 'Post change state user who paid',
        handler: async (_request, res) => {
            var _a;
            const { username } = _request.payload;
            console.log(`usrname: ${username}`);
            const paid = await addTransaction_model_1.TransactionModel.find({ username: username }).sort({ createdAt: -1 }).exec();
            return res.response({
                paid: (_a = paid[0]) === null || _a === void 0 ? void 0 : _a.state
            }).code(201);
        },
    }
};
const post1 = {
    method: 'POST',
    path: '/getTransactions',
    options: {
        description: 'Post change state user who paid',
        handler: async (_request, res) => {
            // const { username } = _request.payload as any;
            const transactions = await addTransaction_model_1.TransactionModel.find().sort({ createdAt: -1 }).limit(20).exec();
            return res.response({
                transactions: transactions
            }).code(201);
        },
    }
};
const getTransactionController = [
    post,
    post1
];
exports.default = getTransactionController;
//# sourceMappingURL=getTransaction.controller.js.map