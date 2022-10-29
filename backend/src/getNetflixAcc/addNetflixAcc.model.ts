import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRuleEngine {
    username?: string;
    accName?: string;
    accPwd?: string;
    slot?: Number;
    createdBy?: string;
    updatedBy?: string;
  }
export type RuleEngineDocument = IRuleEngine & Document;

const ruleEngineSchema: Schema<RuleEngineDocument> = new Schema(
  {    
    username: {
      type: String,
      required: true,      
      unique: true
    },
    accPwd: {
      type: String
    },
    accName: {
      type: String
    },
    slot: {
      type: Number
    },
    createdBy: {
      type: String
    },
    updatedBy: {
      type: String
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ruleEngineSchema.set('toObject', {
  virtuals: true
});

export const RuleEngineModel: Model<RuleEngineDocument> = mongoose.model(
  "netflixAcc",
  ruleEngineSchema,
  "netflixAcc"
);
