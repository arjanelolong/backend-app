import { Document, Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export enum ActivityType {
  CREATED = 'CREATED',
  LOGIN = 'LOGIN',
}

export type ActivityDocument = Document & {
  name: string;
  user: string;
  type: ActivityType;
  createdAt: Date;
};

export const ActivitySchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    user: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => new Date(),
    },
  },
  {
    _id: false,
  },
);

ActivitySchema.virtual('id').get(function (this: Document) {
  return this._id;
});

export default model<ActivityDocument>('Activity', ActivitySchema);
