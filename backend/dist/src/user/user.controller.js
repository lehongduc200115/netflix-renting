"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
const loginhistory_model_1 = require("../history/loginhistory.model");
const getList = {
    method: 'GET',
    path: `/user`,
    options: {
        description: 'Get rules',
        tags: ['api', 'Rule Engine'],
        handler: async (_request, h) => {
            const data = await user_model_1.RuleEngineModel.find({});
            return h.response(data).code(200);
        }
    }
};
const get = {
    method: 'GET',
    path: `/user/{id}`,
    options: {
        description: 'Get rule by id',
        tags: ['api', 'Rule Engine'],
        handler: async (request, h) => {
            const data = await user_model_1.RuleEngineModel.findById(request.params.id);
            return h.response({
                data: data
            }).code(200);
        },
    }
};
const postLogin = {
    method: 'POST',
    path: `/login`,
    options: {
        description: 'Post login by username, passwd',
        handler: async (_request, res) => {
            const { username, password } = _request.payload;
            const users = await user_model_1.RuleEngineModel.findOne({ username: username, password: password }).exec();
            return res.response({
                username: users ? users.username : null
            }).code(201);
        },
    }
};
const postRegister = {
    method: 'POST',
    path: `/register`,
    options: {
        description: 'Post register by username, passwd',
        // return h.response({
        //   data:"false"
        // }).code(201); 
        handler: async (_request, res) => {
            const { username, password, phone } = _request.payload;
            const users = await user_model_1.RuleEngineModel.findOne({ username: username }).exec();
            console.log(`users: ${JSON.stringify(users)}`);
            let doc = null;
            if (!users) {
                doc = await user_model_1.RuleEngineModel.create({ username: username, password: password, phone: phone });
                await loginhistory_model_1.LoginHistoryModel.create({ username: username, count: 0 });
            }
            return res.response({
                username: doc ? doc.username : null,
                isExist: !!users
            }).code(201);
        },
    }
};
const ruleEngineController = [
    getList,
    get,
    postLogin,
    postRegister,
];
exports.default = ruleEngineController;
//# sourceMappingURL=user.controller.js.map