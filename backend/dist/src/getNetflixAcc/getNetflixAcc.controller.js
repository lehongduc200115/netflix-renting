"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addNetflixAcc_model_1 = require("./addNetflixAcc.model");
const post = {
    method: "POST",
    path: `/getNetflixAcc`,
    options: {
        description: "Post get netflix account",
        handler: async (_request, res) => {
            const acc = await addNetflixAcc_model_1.RuleEngineModel.findOne().where("slot").gte(0).exec();
            console.log(`acc: ${JSON.stringify(acc)}`);
            await addNetflixAcc_model_1.RuleEngineModel.findOneAndUpdate({ email: acc === null || acc === void 0 ? void 0 : acc.email }, { slot: (acc === null || acc === void 0 ? void 0 : acc.slot) ? acc === null || acc === void 0 ? void 0 : acc.slot : 0 - 1 });
            return res
                .response({
                username: acc === null || acc === void 0 ? void 0 : acc.username,
                password: acc === null || acc === void 0 ? void 0 : acc.password,
            })
                .code(201);
        },
    },
};
const post2 = {
    method: "POST",
    path: `/addNetFlixAccount`,
    options: {
        description: "Create new netflix account",
        handler: async (_request, res) => {
            const acc = await addNetflixAcc_model_1.RuleEngineModel.create({
                username: "netflixUsername1",
                password: "netflixPwd1",
                email: "lehongduc2001151@gmail.com",
                slot: 5
            });
            return res.response({}).code(201);
        },
    },
};
const getNetflixAccController = [post, post2];
exports.default = getNetflixAccController;
//# sourceMappingURL=getNetflixAcc.controller.js.map