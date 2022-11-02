import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { AccountType } from "./account.enum";
import config from "../config"

export interface IAccount {
  email: string;
  username: string;
  password: string;
  slot: number;
  type: AccountType;
  ownTo?: string;
  createdBy?: string;
  updatedBy?: string;
}
export type AccountDocument = IAccount & Document;

const accountSchema: Schema<AccountDocument> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    slot: {
      type: Number,
      default: 1,
      required: true,
    },
    ownTo: {
      type: String,
      default: config.MAIL_USERNAME,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

accountSchema.set("toObject", {
  virtuals: true,
});

export const AccountModel: Model<AccountDocument> = mongoose.model(
  "account",
  accountSchema,
);
