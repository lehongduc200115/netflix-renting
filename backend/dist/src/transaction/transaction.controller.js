"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_model_1 = require("./transaction.model");
;
const buyHistory_model_1 = require("../history/buyHistory.model");
const transaction_constant_1 = __importDefault(require("./transaction.constant"));
const httpConstant_1 = require("../common/httpConstant");
const post = {
    method: "POST",
    path: `/${transaction_constant_1.default.TRANSACTION_PATH}`,
    options: {
        description: "Post add user who paid",
        handler: async (request, res) => {
            const { email, id, name, price } = request.payload;
            console.log(`id vao: ${id}`);
            console.log(`typeOfId ${typeof id}`);
            const ress = await buyHistory_model_1.BuyHistoryModel.findOneAndUpdate({ pakageType: id.toString() }, { $inc: { count: 1 } }, { new: true });
            console.log(`ress: ${JSON.stringify(ress)}`);
            const result = await transaction_model_1.TransactionModel.create({
                id,
                email,
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
            return res.response({ email: result === null || result === void 0 ? void 0 : result.email }).code(201);
        },
    },
};
const getByEmail = {
    method: httpConstant_1.HttpMethod.GET,
    path: `/${transaction_constant_1.default.TRANSACTION_PATH}/{email}`,
    options: {
        description: 'Get transaction by email',
        handler: async (request, res) => {
            var _a;
            const { email } = request.params;
            console.log(`usrname: ${email}`);
            const paid = await transaction_model_1.TransactionModel.find({ email: email }).sort({ createdAt: -1 }).exec();
            return res.response({
                paid: (_a = paid[0]) === null || _a === void 0 ? void 0 : _a.state
            }).code(201);
        },
    }
};
const getList = {
    method: httpConstant_1.HttpMethod.GET,
    path: `/${transaction_constant_1.default.TRANSACTION_PATH}`,
    options: {
        description: 'Get list of transaction',
        handler: async (_request, res) => {
            // const { email } = request.payload as any;
            const transactions = await transaction_model_1.TransactionModel.find().sort({ createdAt: -1 }).limit(20).exec();
            return res.response({
                transactions: transactions
            }).code(201);
        },
    }
};
const putPay = {
    method: 'PUT',
    path: `/${transaction_constant_1.default.TRANSACTION_PATH}/pay`,
    options: {
        description: 'Put change state user who paid',
        handler: async (request, res) => {
            const { transactionId, email } = request.payload;
            await transaction_model_1.TransactionModel
                .findOneAndUpdate({ _id: transactionId }, { state: "true" });
            return res.response({}).code(201);
        },
    }
};
const transactionController = [
    post,
    getList,
    getByEmail,
    putPay,
];
exports.default = transactionController;
//# sourceMappingURL=transaction.controller.js.map