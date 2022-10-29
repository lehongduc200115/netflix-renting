"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEngineModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ruleEngineSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    // package1: {
    //   type: String,
    // },
    amount: {
        type: String,
    },
    state: {
        type: Boolean,
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
    },
    isTemplate: {
        type: Boolean
    }
}, {
    timestamps: true,
    versionKey: false
});
ruleEngineSchema.set('toObject', {
    virtuals: true
});
// rulePackage1Schema.set('toObject', {
//   virtuals: true
// });
exports.RuleEngineModel = mongoose_1.default.model("constant.updateTransaction", ruleEngineSchema, "constant.updateTransaction");
//# sourceMappingURL=updateTransaction.model.js.map