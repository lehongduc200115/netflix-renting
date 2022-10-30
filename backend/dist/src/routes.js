"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const ping_controller_1 = __importDefault(require("./ping/ping.controller"));
const user_controller_1 = __importDefault(require("./user/user.controller"));
const addTransaction_controller_1 = __importDefault(require("./addTransaction/addTransaction.controller"));
const getTransaction_controller_1 = __importDefault(require("./getTransaction/getTransaction.controller"));
const updateTransaction_controller_1 = __importDefault(require("./updateTransaction/updateTransaction.controller"));
const history_controller_1 = __importDefault(require("./history/history.controller"));
const routes = [
    ...ping_controller_1.default,
    ...user_controller_1.default,
    ...addTransaction_controller_1.default,
    ...getTransaction_controller_1.default,
    ...updateTransaction_controller_1.default,
    ...history_controller_1.default
    // ...campaignController
];
exports.routes = routes;
//# sourceMappingURL=routes.js.map