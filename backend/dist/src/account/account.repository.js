"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneByType = exports.findOneAndUpdateByType = void 0;
const account_model_1 = require("./account.model");
const findOneAndUpdateByType = async (type) => {
    const account = await account_model_1.AccountModel.findOneAndUpdate({
        type: type,
        slot: {
            $gt: 0,
        },
    }, {
        $inc: {
            slot: -1,
        },
    }, {
        new: true,
    }).exec();
    if (!account) {
        throw new Error();
    }
    return {
        username: account.username,
        password: account.password,
    };
};
exports.findOneAndUpdateByType = findOneAndUpdateByType;
const findOneByType = async (type) => {
    const account = await account_model_1.AccountModel.findOne({
        type: type,
        slot: {
            $gt: 0,
        },
    }).exec();
    return {
        username: account === null || account === void 0 ? void 0 : account.username,
        password: account === null || account === void 0 ? void 0 : account.password,
    };
};
exports.findOneByType = findOneByType;
const AccountRepository = {
    findOneByType: exports.findOneByType,
    findOneAndUpdateByType: exports.findOneAndUpdateByType,
};
exports.default = AccountRepository;
//# sourceMappingURL=account.repository.js.map