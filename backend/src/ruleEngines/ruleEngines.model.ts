import mongoose, { Document, Model, Schema } from 'mongoose';
import constant from './ruleEngines.constant';
import { IRuleEngine } from './ruleEngines.interface';

export type RuleEngineDocument = IRuleEngine & Document;

const ruleEngineSchema: Schema<RuleEngineDocument> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    applyTo: {
      type: String,
      index: true
    },
    campaignType: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    conditions: {
      type: Array
    },
    compiledRule: {
      type: Object
    },
    status: {
      type: String,
      index: true,
      required: true
    },
    createdBy: {
      type: String
    },
    updatedBy: {
      type: String
    },
    isTemplate: {
      type: Boolean,
      required: true
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
  constant.MODEL_NAME,
  ruleEngineSchema,
  constant.MODEL_NAME
);
