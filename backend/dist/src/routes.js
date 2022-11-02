"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const ping_controller_1 = __importDefault(require("./ping/ping.controller"));
const user_controller_1 = __importDefault(require("./user/user.controller"));
const transaction_controller_1 = __importDefault(require("./transaction/transaction.controller"));
const history_controller_1 = __importDefault(require("./history/history.controller"));
const sendMail_controller_1 = __importDefault(require("./sendMail/sendMail.controller"));
const getNetflixAcc_controller_1 = __importDefault(require("./getNetflixAcc/getNetflixAcc.controller"));
const routes = [
    ...ping_controller_1.default,
    ...user_controller_1.default,
    ...transaction_controller_1.default,
    ...history_controller_1.default,
    ...sendMail_controller_1.default,
    ...getNetflixAcc_controller_1.default,
];
exports.routes = routes;
//# sourceMappingURL=routes.js.map