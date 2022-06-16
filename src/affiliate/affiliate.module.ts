import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { AffiliateService } from './affiliate.service';
import { AffiliateResolver } from './affiliate.resolver';
import { appProviders } from '../app.provider';

@Module({
  imports: [DatabaseModule],
  providers: [AffiliateService, AffiliateResolver,...appProviders]
})
export class AffiliateModule {}
