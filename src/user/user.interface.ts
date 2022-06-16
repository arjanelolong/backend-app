import { Document } from 'mongoose';
import { Affiliate } from '../graphql';

export interface UserInterface extends Document {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly affiliate: Affiliate;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreateUserInput {
  username: string;
  password: string;
  affiliate: string;
}

