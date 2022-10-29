import { boolean } from 'joi';
import mongoose, { Document, Model, Schema } from 'mongoose';


export interface IRuleEngine {
  username?: String;
  id?: String;
  name?: String;
  price?: String;
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
    state: {
      type: Boolean
    },
    id: {
      type: String
    },
    name: {
      type: String
    },
    price: {
      type: String
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
// rulePackage1Schema.set('toObject', {
//   virtuals: true
// });

export const RuleEngineModel: Model<RuleEngineDocument> = mongoose.model(
  "Transaction",
  ruleEngineSchema,
  "Transaction"
);
