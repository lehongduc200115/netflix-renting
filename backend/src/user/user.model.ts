import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRuleEngine {
    username?: string;
    password?: string;
    status?: "Status";
    isTemplate?: boolean;
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
    password: {
      type: String,
      minlength: 6
    },
    status: {
      type: String,
      index: true,
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
  "user",
  ruleEngineSchema,
  "user"
);
