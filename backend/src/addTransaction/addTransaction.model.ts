import { boolean } from 'joi';
import mongoose, { Document, Model, Schema } from 'mongoose';

interface Package1 {
  id: String;
  name: String;
  detail: {
    price: Number
  };
}

export type RulePackage1Document = Package1 & Document;

const rulePackage1Schema: Schema<RulePackage1Document> = new Schema(
  {
    id: {
      type: String
    },
    name: {
      type: String
    },
    detail: {
      type: Object
    },
  }
);



export interface IRuleEngine {
  username?: String;
  package1?: Package1;
  amount?: Number;
  state?: boolean;
  isTemplate?: boolean;
  createdBy?: String;
  updatedBy?: String;
}
export type RuleEngineDocument = IRuleEngine & Document;

const ruleEngineSchema: Schema<RuleEngineDocument> = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    package1: {
      type: String,
    },
    amount: {
      type: String,
    },
    state: {
      type: Boolean
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
rulePackage1Schema.set('toObject', {
  virtuals: true
});

export const RuleEngineModel: Model<RuleEngineDocument> = mongoose.model(
  "Transaction",
  ruleEngineSchema,
  "Transaction"
);
