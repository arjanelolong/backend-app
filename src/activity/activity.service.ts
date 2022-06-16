import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ActivityInterface, CreateActivityInput } from './activity.interface';
import { Activity } from '../graphql';

@Injectable()
export class ActivityService {
  constructor(
    @Inject('ACTIVITY_MODEL')
    private activity: Model<ActivityInterface>,
  ) {}

  async findAll(filter: object): Promise<Activity[]> {
    return (await this.activity.find(filter).exec()) as any;
  }

  async findById(id: string): Promise<Activity> {
    return await this.activity.findOne({ _id: id }).exec();
  }

  async create(input: CreateActivityInput): Promise<any> {
    const data = {
      ...input,
    };

    return new this.activity(data).save();
  }
}
