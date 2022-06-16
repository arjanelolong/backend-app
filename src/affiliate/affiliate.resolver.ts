import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AffiliateService } from './affiliate.service';

@Resolver()
export class AffiliateResolver {
    constructor(
        private affiliateService: AffiliateService,
     ) {}


    @Query()
    affiliates() {
        return this.affiliateService.findAll();
    }

    @Query()
    affiliate(@Args('id') id: string) {
        return this.affiliateService.findById(id);
    }

    @Mutation()
    async createAffiliate(
        @Args('input')
        input: {
            name: string;
        },
    ) {
        return this.affiliateService.create(input);
    }
}
