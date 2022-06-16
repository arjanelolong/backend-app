import { Document, Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type AffiliateDocument = Document & {
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const AffiliateSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    _id: false,
  },
);

AffiliateSchema.index({ Affiliatename: 1 });

AffiliateSchema.virtual('id').get(function (this: Document) {
  return this._id;
});

export default model<AffiliateDocument>('Affiliate', AffiliateSchema);
