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
    path: `/user`,
    options: {
        description: 'Post rule by id',
        tags: ['api', 'Rule Engine'],
        handler: async (_request, h) => {
            user_model_1.RuleEngineModel.create({ name: 'small' });
            return h.response({
                data: "da tao"
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