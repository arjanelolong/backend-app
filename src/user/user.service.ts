import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../graphql';
import { UserInterface, CreateUserInput } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private user: Model<UserInterface>,
  ) {}

  async findAll(filter: object): Promise<User[]> {
    return (await this.user.find(filter).exec()) as any;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.user.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User> {
    return await this.user.findOne({ _id: id }).exec();
  }

  async create(input: CreateUserInput): Promise<any> {
    const data = {
      ...input,
    };

    return new this.user(data).save();
  }

}
