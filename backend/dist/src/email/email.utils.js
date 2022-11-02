"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const email_constant_1 = __importDefault(require("./email.constant"));
const sendMail = (option) => {
    const transport = nodemailer_1.default.createTransport({
        host: email_constant_1.default.MAIL_HOST,
        port: email_constant_1.default.MAIL_PORT,
        secure: false,
        auth: {
            user: config_1.default.mailUsername,
            pass: config_1.default.mailPassword,
        }
    });
    const options = {
        from: email_constant_1.default.MAIL_FROM_ADDRESS,
        to: option.to,
        subject: option.subject,
        html: option.htmlContent
    };
    return transport.sendMail(options);
};
exports.default = sendMail;
//# sourceMappingURL=email.utils.js.map