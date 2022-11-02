"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_model_1 = require("./account.model");
const account_constant_1 = __importDefault(require("./account.constant"));
const httpConstant_1 = require("../common/httpConstant");
const enum_1 = require("../common/enum");
const account_repository_1 = require("./account.repository");
const getAvailable = {
    method: httpConstant_1.HttpMethod.PUT,
    path: `/${account_constant_1.default}`,
    options: {
        description: "Get account wheather it available",
        handler: async (request, res) => {
            const { type } = request.payload;
            const account = await (0, account_repository_1.findOneByType)(type);
            return res.response({ found: !!account.username }).code(httpConstant_1.HttpStatus.OK);
        },
    },
};
const post = {
    method: httpConstant_1.HttpMethod.POST,
    path: `/${account_constant_1.default}`,
    options: {
        description: "Create a new account",
        handler: async (request, res) => {
            const body = request.payload;
            const acc = await account_model_1.AccountModel.create({
                username: body.username || "netflixUsername1",
                password: body.password || "netflixPwd1",
                email: body.email || "lehongduc2001151@gmail.com",
                slot: body.slot || 4,
            });
            return res.response({}).code(httpConstant_1.HttpStatus.CREATED);
        },
    },
};
const get = {
    method: httpConstant_1.HttpMethod.GET,
    path: `/${account_constant_1.default}`,
    options: {
        description: "Get accounts",
        handler: async (_request, res) => {
            const accounts = await account_model_1.AccountModel.find({}).sort({ createdAt: enum_1.SortTypeEnum.DESCENDING });
            return res.response({ accounts: accounts }).code(httpConstant_1.HttpStatus.OK);
        },
    },
};
const accountController = [post, getAvailable, get];
exports.default = accountController;
//# sourceMappingURL=account.controller.js.map