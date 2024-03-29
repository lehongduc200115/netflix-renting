"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
const loginhistory_model_1 = require("../history/loginhistory.model");
const httpConstant_1 = require("../common/httpConstant");
const getList = {
    method: httpConstant_1.HttpMethod.GET,
    path: `/user`,
    options: {
        description: "Get all users",
        tags: ["api", "User"],
        handler: async (_request, h) => {
            const data = await user_model_1.UserModel.find({});
            return h.response(data).code(httpConstant_1.HttpStatus.OK);
        },
    },
};
const get = {
    method: httpConstant_1.HttpMethod.GET,
    path: `/user/{id}`,
    options: {
        description: "Get user by id",
        tags: ["api", "User"],
        handler: async (request, h) => {
            const data = await user_model_1.UserModel.findById(request.params.id);
            return h
                .response({
                data: data,
            })
                .code(200);
        },
    },
};
const login = {
    method: httpConstant_1.HttpMethod.POST,
    path: `/login`,
    options: {
        description: "Post login by email, passwd",
        handler: async (request, res) => {
            const { email, password } = request.payload;
            const users = await user_model_1.UserModel.findOne({
                email: email,
                password: password,
            }).exec();
            if (!!users)
                await loginhistory_model_1.LoginHistoryModel.findOneAndUpdate({ email: email }, { $inc: { count: 1 } });
            return res
                .response({
                email: users ? users.email : null,
            })
                .code(httpConstant_1.HttpStatus.OK);
        },
    },
};
const register = {
    method: httpConstant_1.HttpMethod.POST,
    path: `/register`,
    options: {
        description: "Register new user",
        handler: async (request, res) => {
            const { email, password, phone } = request.payload;
            const users = await user_model_1.UserModel.findOne({ email: email }).exec();
            console.log(`users: ${JSON.stringify(users)}`);
            let doc = null;
            if (!users) {
                doc = await user_model_1.UserModel.create({
                    email: email,
                    password: password,
                    phone: phone,
                });
                await loginhistory_model_1.LoginHistoryModel.create({ email: email, count: 0 });
            }
            return res
                .response({
                email: doc ? doc.email : null,
                isExist: !!users,
            })
                .code(httpConstant_1.HttpStatus.CREATED);
        },
    },
};
const verify = {
    method: httpConstant_1.HttpMethod.GET,
    path: `/user/verify`,
    options: {
        description: "Verify user by emailing",
        handler: async (request, res) => {
            const { email } = request.query;
            // const users = await UserModel.findOne({ email: email }).exec();
            // console.log(`users: ${JSON.stringify(users)}`);
            const foundUser = await user_model_1.UserModel.findOneAndUpdate({
                email: email,
                isVerified: false,
            }, {
                isVerified: true,
            });
            return res
                .response({
                isVerified: !!foundUser,
            })
                .code(httpConstant_1.HttpStatus.OK);
        },
    },
};
const userController = [getList, get, login, register, verify];
exports.default = userController;
//# sourceMappingURL=user.controller.js.map