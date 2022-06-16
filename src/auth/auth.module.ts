import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy.service';
import { jwtSecret } from '../config/constants';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { DatabaseModule } from '../db/db.module';
import { ActivityModule } from '../activity/activity.module';
import { ActivityService } from '../activity/activity.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: jwtSecret,
        signOptions: { expiresIn: '6000s' },
      }),
    }),
    DatabaseModule,
    UserModule,
    ActivityModule,
  ],
  providers: [
    AuthService, 
    JwtStrategy, 
    AuthResolver, 
    UserService,
    ActivityService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
