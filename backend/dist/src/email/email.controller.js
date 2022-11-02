"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_utils_1 = __importDefault(require("./email.utils"));
const account_repository_1 = __importDefault(require("../account/account.repository"));
const httpConstant_1 = require("../common/httpConstant");
const email_constant_1 = __importDefault(require("./email.constant"));
const accountTemplate = (email, password) => `This is your account:
  <br>email: <b>${email}</b>
  <br>password: <b>${password}</b>
  <br>Start your journey <a href="netflix.com"> here! </a>
`;
const verificationTemplate = (email) => `Click 
  <a href="localhost:8000/user/verify?email=${encodeURI(email)}"> here! </a>
  to verify your account
`;
// ) => {
//   return readFileSync('../../assets/mail-template/index.html')
// }
const sendAccount = {
    method: httpConstant_1.HttpMethod.POST,
    path: `${email_constant_1.default.EMAIL_PATH}/sendAccount`,
    options: {
        description: "Send account detail email",
        handler: async (request, res) => {
            const { email, type } = request.payload;
            const account = await account_repository_1.default.findOneAndUpdateByType(type);
            if (email) {
                const option = {
                    to: email,
                    subject: email_constant_1.default.ACCOUNT_SUBJECT,
                    htmlContent: accountTemplate(account.username, account.password),
                };
                const printOut = (0, email_utils_1.default)(option);
                console.log(printOut);
            }
            return res.response("success").code(200);
        },
    },
};
const sendVerification = {
    method: httpConstant_1.HttpMethod.POST,
    path: `${email_constant_1.default.EMAIL_PATH}/sendVerification`,
    options: {
        description: "Send verification email",
        handler: async (request, res) => {
            const { email } = request.payload;
            if (email) {
                const option = {
                    to: email,
                    subject: email_constant_1.default.VERIFY_SUBJECT,
                    htmlContent: verificationTemplate(email),
                };
                const printOut = (0, email_utils_1.default)(option);
                console.log(printOut);
            }
            return res.response("success").code(200);
        },
    },
};
const sendMailController = [sendAccount, sendVerification];
exports.default = sendMailController;
//# sourceMappingURL=email.controller.js.map