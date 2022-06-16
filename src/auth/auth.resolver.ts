import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { ActivityType } from '../graphql';
import { PubSub } from 'graphql-subscriptions';
import { pubSub } from '../activity/activity.resolver';
@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private activityService: ActivityService,
  ) {}

  @Mutation()
  async login(
    @Args('input')
    input: {
      username: string;
      password: string;
    },
  ) {
    const user = await this.authService.validateUser(
      input.username,
      input.password,
    );

    if (!user) {
      throw new BadRequestException(`Username or password are invalid`);
    } else {
      const activity = await this.activityService.create({
        user: user.id,
        type: ActivityType.LOGIN,
      });

      if(activity){
        await pubSub.publish('activityCreated', { activityCreated: activity });
      }

      return this.authService.generateUserCredentials(user);
    }
  }
}
