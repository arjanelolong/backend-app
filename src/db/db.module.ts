import { Module } from '@nestjs/common';
import { appProviders } from '../app.provider';

@Module({
  providers: [...appProviders],
  exports: [...appProviders],
})
export class DatabaseModule {}
