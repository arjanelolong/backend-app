import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  Query,
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import * as R from 'ramda';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActivityType, Affiliate, User } from '../graphql';
import { CurrentUser } from './user.decorator';
import { ActivityService } from '../activity/activity.service';
import { AffiliateService } from '../affiliate/affiliate.service';
import { pubSub } from '../activity/activity.resolver';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private affiliateService: AffiliateService,
  ) {}

  @Mutation()
  async createUser(
    @Args('input')
    input: {
      username: string;
      password: string;
      affiliateCode?: string;
    },
  ) {
    if (await this.userService.findByUsername(input.username)) {
      throw new BadRequestException('Username is already taken');
    }

    let affiliate: Affiliate;
    if(input.affiliateCode){
      affiliate = await this.affiliateService.findByCode(input.affiliateCode);

      if(!affiliate){
        throw new BadRequestException('Invalid affiliate code');
      }
    }

    const user = await this.userService.create({
      ...R.pick(['username', 'password'], input),
      affiliate: affiliate ? affiliate.id : null,
    });

    if (user) {
      const activity = await this.activityService.create({
        user: user.id,
        type: ActivityType.CREATED,
      });

      if(activity){
        pubSub.publish('activityCreated', { activityCreated: activity });
      }
      
    }

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Query()
  me(@CurrentUser() user: User) {
    return this.userService.findById(user.id);
  }

  @ResolveField('affiliate')
  async getAffiliate(@Parent() userModel) {
    return this.affiliateService.findById(userModel.affiliate);
  }
}
