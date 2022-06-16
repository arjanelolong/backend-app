import { Document } from 'mongoose';

export interface AffiliateInterface extends Document {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreateAffiliateInput {
  name: string;
}

