import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { DatabaseModule } from '../db/db.module';
import { appProviders } from '../app.provider';
import { ActivityModule } from '../activity/activity.module';
import { ActivityService } from '../activity/activity.service';
import { AffiliateModule } from '../affiliate/affiliate.module';
import { AffiliateService } from '../affiliate/affiliate.service';

@Module({
  imports: [DatabaseModule, ActivityModule, AffiliateModule],
  providers: [
    UserService,
    UserResolver,
    ActivityService,
    AffiliateService,
    ...appProviders,
  ],
})
export class UserModule {}
