import { boolean } from 'joi';
import mongoose, { Document, Model, Schema } from 'mongoose';


export interface IRuleEngine {
  username?: String;
  id?: Number;
  name?: String;
  price?: String;
  state?: boolean;
  isTemplate?: boolean;
  createdBy?: String;
  updatedBy?: String;
}
export type RuleEngineDocument = IRuleEngine & Document;

const TransactionSchema: Schema<RuleEngineDocument> = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    state: {
      type: Boolean
    },
    id: {
      type: Number
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

TransactionSchema.set('toObject', {
  virtuals: true
});
// rulePackage1Schema.set('toObject', {
//   virtuals: true
// });

export const TransactionModel: Model<RuleEngineDocument> = mongoose.model(
  "Transaction",
  TransactionSchema,
  "Transaction"
);
