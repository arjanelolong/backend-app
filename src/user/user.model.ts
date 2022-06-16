import { Document, Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = Document & {
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    affiliate: {
      type: String,
      default: null,
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

UserSchema.index({ username: 1 });

UserSchema.virtual('id').get(function (this: Document) {
  return this._id;
});

export default model<UserDocument>('User', UserSchema);
