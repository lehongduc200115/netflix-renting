import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRuleEngine {
    email?: string;
    count?: Number;
  }
export type RuleEngineDocument = IRuleEngine & Document;

const loginHistorySchema: Schema<RuleEngineDocument> = new Schema(
  {    
    email: {
      type: String,
      required: true,      
      unique: true
    },
    count: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

loginHistorySchema.set('toObject', {
  virtuals: true
});

export const LoginHistoryModel: Model<RuleEngineDocument> = mongoose.model(
  "LoginHistory",
  loginHistorySchema,
  "LoginHistory"
);
