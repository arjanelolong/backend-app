import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { ActivityType } from '../graphql';

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
      await this.activityService.create({
        user: user.id,
        type: ActivityType.LOGIN,
      });

      return this.authService.generateUserCredentials(user);
    }
  }
}
