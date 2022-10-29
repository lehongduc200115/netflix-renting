"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addNetflixAcc_model_1 = require("./addNetflixAcc.model");
const post = {
    method: 'POST',
    path: `/getNetflixAcc`,
    options: {
        description: 'Post get netflix account',
        handler: async (_request, res) => {
            const acc = await addNetflixAcc_model_1.RuleEngineModel
                .findOne().where('slot').gte(0).exec();
            await addNetflixAcc_model_1.RuleEngineModel.findOneAndUpdate({ username: acc === null || acc === void 0 ? void 0 : acc.username }, { slot: ((acc === null || acc === void 0 ? void 0 : acc.slot) ? acc === null || acc === void 0 ? void 0 : acc.slot : 0 - 1) });
            return res.response({
                accName: acc === null || acc === void 0 ? void 0 : acc.accName,
                accPwd: acc === null || acc === void 0 ? void 0 : acc.accPwd
            }).code(201);
        },
    }
};
const ruleEngineController = [
    post
];
exports.default = ruleEngineController;
//# sourceMappingURL=getNetflixAcc.controller.js.map