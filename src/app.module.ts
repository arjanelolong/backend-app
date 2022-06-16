import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ActivityModule } from './activity/activity.module';
import { ExchangeModule } from './exchange/exchange.module';
import { AffiliateModule } from './affiliate/affiliate.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.gql'],
      definitions: {
        path: join(process.cwd(), './graphql.ts'),
      },
      playground: process.env.ENVIRONMENT === 'production' ? false : true,
    }),
    UserModule,
    AuthModule,
    ActivityModule,
    ExchangeModule,
    AffiliateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
