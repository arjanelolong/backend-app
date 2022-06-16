import { Args, Query, Resolver } from '@nestjs/graphql';
import { ExchangeFilterInput } from './exchange.interface';
import { ExchangeService } from './exchange.service';

@Resolver()
export class ExchangeResolver {
  constructor(private exchangeService: ExchangeService) {}

  @Query()
  async exchange(
    @Args('input')
    input: ExchangeFilterInput,
  ) {
    return this.exchangeService.getExchangeRate(input);
  }
}
