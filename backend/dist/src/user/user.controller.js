"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
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
const post = {
    method: 'POST',
    path: `/login`,
    options: {
        description: 'Post login by username, passwd',
        // return h.response({
        //   data:"false"
        // }).code(201); 
        handler: async (_request, res) => {
            const { username, password } = _request.payload;
            const users = await user_model_1.RuleEngineModel.find({ username: username, password: password })
                .then(_data => {
                console.log(_data);
                return _data;
            }).catch(_err => {
                console.log("Network error!user controller");
                return {};
            });
            return res.response({
                userId: users || null
            }).code(201);
        },
    }
};
const ruleEngineController = [
    getList,
    get,
    post
];
exports.default = ruleEngineController;
//# sourceMappingURL=user.controller.js.map