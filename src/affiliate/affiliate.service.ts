import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Affiliate } from '../graphql';
import { AffiliateInterface, CreateAffiliateInput } from './affiliate.interface';
import generateAffiliateCode from '../library/generateAffiliateCode';

@Injectable()
export class AffiliateService {
  constructor(
    @Inject('AFFILIATE_MODEL')
    private affiliate: Model<AffiliateInterface>,
  ) {}

  async findAll(): Promise<Affiliate[]> {
    return await this.affiliate.find().exec();
  }

  async findByCode(code: string): Promise<Affiliate> {
    return await this.affiliate.findOne({ code: code }).exec();
  }

  async findById(id: string): Promise<Affiliate> {
    return await this.affiliate.findOne({ _id: id }).exec();
  }

  async create(input: CreateAffiliateInput): Promise<any> {
    const data = {
      ...input,
      code: generateAffiliateCode(),
    };

    return new this.affiliate(data).save();
  }

}
