"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginhistory_model_1 = require("./loginhistory.model");
const buyHistory_model_1 = require("./buyHistory.model");
const package_constant_1 = require("./package.constant");
const postInitHistory = {
    method: 'POST',
    path: `/initHistory`,
    options: {
        description: 'Post get login history',
        auth: 'jwt',
        handler: async (_request, res) => {
            // const {email} = request.payload as any;
            await buyHistory_model_1.BuyHistoryModel.create({ pakageType: 1, count: 0 });
            await buyHistory_model_1.BuyHistoryModel.create({ pakageType: 2, count: 0 });
            await buyHistory_model_1.BuyHistoryModel.create({ pakageType: 3, count: 0 });
            await buyHistory_model_1.BuyHistoryModel.create({ pakageType: 7, count: 0 });
            await buyHistory_model_1.BuyHistoryModel.create({ pakageType: 30, count: 0 });
            return res.response({}).code(201);
        },
    }
};
const postHistory = {
    method: 'POST',
    path: `/getLoginHistory`,
    options: {
        description: 'Post get login history',
        handler: async (_request, res) => {
            // const {email} = request.payload as any;
            const data = await loginhistory_model_1.LoginHistoryModel.find().limit(20).exec();
            return res.response({
                data: data
            }).code(201);
        },
    }
};
const postBuyHistory = {
    method: 'POST',
    path: `/getBuyHistory`,
    options: {
        description: 'Post get buy history',
        handler: async (_request, res) => {
            // const {email} = request.payload as any;
            const data = await buyHistory_model_1.BuyHistoryModel.find().limit(20).exec();
            console.log("1");
            return res.response({
                [package_constant_1.PACKAGE1.ONEDAY.id]: data[0].count,
                [package_constant_1.PACKAGE1.TWODAYS.id]: data[1].count,
                [package_constant_1.PACKAGE1.THREEDAYS.id]: data[2].count,
                [package_constant_1.PACKAGE1.WEEK.id]: data[3].count,
                [package_constant_1.PACKAGE1.MONTH.id]: data[4].count,
            }).code(201);
        },
    }
};
const ruleEngineController = [
    postHistory,
    postInitHistory,
    postBuyHistory
];
exports.default = ruleEngineController;
//# sourceMappingURL=history.controller.js.map