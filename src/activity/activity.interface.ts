import { Document } from 'mongoose';
import { User } from '../graphql';
import { ActivityType } from './activity.model';

export interface ActivityInterface extends Document {
  readonly id: string;
  readonly type: ActivityType;
  readonly user: User;
  readonly createdAt: Date;
}

export interface CreateActivityInput {
  type: string;
  user: string;
}
