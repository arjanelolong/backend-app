import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../graphql';
import { CurrentUser } from '../user/user.decorator';
import { ActivityService } from '../activity/activity.service';
import { UserService } from '../user/user.service';

@Resolver('Activity')
export class ActivityResolver {
  constructor(
    private activityService: ActivityService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query()
  activities(@CurrentUser() user: User) {
    return this.activityService.findAll({ user: user.id });
  }

  @ResolveField('user')
  async getUser(@Parent() activityModel) {
    return this.userService.findById(activityModel.user);
  }
}
