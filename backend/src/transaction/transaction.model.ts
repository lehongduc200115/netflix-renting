import { boolean } from 'joi';
import mongoose, { Document, Model, Schema } from 'mongoose';


export interface ITransaction {
  email: String;
  id?: Number;
  name?: String;
  price?: String;
  state?: boolean;
  createdBy?: String;
  updatedBy?: String;
}
export type TransactionDocument = ITransaction & Document;

const TransactionSchema: Schema<TransactionDocument> = new Schema(
  {
    email: {
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
  },
  {
    timestamps: true,
    versionKey: false
  }
);

TransactionSchema.set('toObject', {
  virtuals: true
});

export const TransactionModel: Model<TransactionDocument> = mongoose.model(
  "transaction",
  TransactionSchema,
);
