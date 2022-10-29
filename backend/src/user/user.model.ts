import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRuleEngine {
    id?: string;
    name?: string;
    applyTo?: string;
    status?: "Status";
    isTemplate?: boolean;
    createdBy?: string;
    updatedBy?: string;
  }
export type RuleEngineDocument = IRuleEngine & Document;

const ruleEngineSchema: Schema<RuleEngineDocument> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    applyTo: {
      type: String,
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
  "constant.MODEL_NAME",
  ruleEngineSchema,
  "constant.MODEL_NAME"
);
