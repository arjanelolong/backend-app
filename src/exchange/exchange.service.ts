import { Injectable } from '@nestjs/common';
import request from '../library/request';
import { exchangeBaseApiEndpoint } from '../config/constants';
import { ExchangeFilterInput } from './exchange.interface';

@Injectable()
export class ExchangeService {
  async getExchangeRate(input: ExchangeFilterInput): Promise<string> {
    return request(
      `${exchangeBaseApiEndpoint}/${
        input.date || 'latest/'
      }/currencies/${input.currencyCode.toLowerCase()}.json`,
    );
  }
}
