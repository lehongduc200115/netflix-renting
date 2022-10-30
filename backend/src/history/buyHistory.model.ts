import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRuleEngine {
    pakageType?: string;
    count?: Number;
  }
export type RuleEngineDocument = IRuleEngine & Document;

const buyHistorySchema: Schema<RuleEngineDocument> = new Schema(
  {    
    pakageType: {
      type: Number,
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

buyHistorySchema.set('toObject', {
  virtuals: true
});

export const BuyHistoryModel: Model<RuleEngineDocument> = mongoose.model(
  "BuyHistory",
  buyHistorySchema,
  "BuyHistory"
);
