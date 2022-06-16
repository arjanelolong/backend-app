import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { ActivityService } from './activity.service';
import { appProviders } from '../app.provider';
import { ActivityResolver } from './activity.resolver';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  providers: [ActivityService, ActivityResolver, UserService, ...appProviders],
})
export class ActivityModule {}
