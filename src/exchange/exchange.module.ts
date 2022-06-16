import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeResolver } from './exchange.resolver';

@Module({
  providers: [ExchangeService, ExchangeResolver],
})
export class ExchangeModule {}
