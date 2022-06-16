import { Document } from 'mongoose';

export interface ExchangeInterface extends Document {
  readonly code: string;
  readonly amount: number;
}

export type ExchangeFilterInput = {
  currencyCode: string;
  date?: string;
};
