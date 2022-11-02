"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addNetflixAcc_model_1 = require("../getNetflixAcc/addNetflixAcc.model");
const sendMail_utils_1 = __importDefault(require("./sendMail.utils"));
const mailTemplate = (email, password) => `This is your account:
  <br>email: <b>${email}</b>
  <br>password: <b>${password}</b>
  <br>Start your journey <a href="netflix.com"> here! </a>
`;
// ) => {
//   return readFileSync('../../assets/mail-template/index.html')
// }
const post = {
    method: "POST",
    path: `/sendMail`,
    options: {
        description: "Send email to email",
        handler: async (request, res) => {
            const { email } = request.payload;
            const acc = await addNetflixAcc_model_1.RuleEngineModel.findOne().where("slot").gte(0).exec();
            if (acc) {
                await addNetflixAcc_model_1.RuleEngineModel.findOneAndUpdate({ email: acc === null || acc === void 0 ? void 0 : acc.email }, { slot: (acc === null || acc === void 0 ? void 0 : acc.slot) ? acc === null || acc === void 0 ? void 0 : acc.slot : 0 - 1 });
                const printOut = (0, sendMail_utils_1.default)(email, mailTemplate(acc.email, acc.password));
                console.log(printOut);
            }
            return res.response("success").code(200);
        },
    },
};
const sendMailController = [post];
exports.default = sendMailController;
//# sourceMappingURL=sendMail.controller.js.map