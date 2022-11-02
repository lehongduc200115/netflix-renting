"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const constant = {
    MAIL_MAILER: "smtp",
    MAIL_HOST: "smtp.gmail.com",
    MAIL_PORT: 587,
    MAIL_USERNAME: config_1.default.mailUsername,
    MAIL_PASSWORD: config_1.default.mailPassword,
    MAIL_ENCRYPTION: "TLS",
    MAIL_FROM_ADDRESS: "lehongduc2001151@gmail.com",
    MAIL_FROM_NAME: "Renting account",
    SUBJECT: "[Netflix account] Thank you for your purchase!"
};
const sendMail = (to, htmlContent) => {
    console.log(`config.mailUsername: ${config_1.default.mailUsername}`);
    console.log(`config.mailPassword: ${config_1.default.mailPassword}`);
    const transport = nodemailer_1.default.createTransport({
        host: constant.MAIL_HOST,
        port: constant.MAIL_PORT,
        secure: false,
        auth: {
            user: constant.MAIL_USERNAME,
            pass: constant.MAIL_PASSWORD,
        }
    });
    const options = {
        from: constant.MAIL_FROM_ADDRESS,
        to: to,
        subject: constant.SUBJECT,
        html: htmlContent
    };
    return transport.sendMail(options);
};
exports.default = sendMail;
//# sourceMappingURL=sendMail.utils.js.map