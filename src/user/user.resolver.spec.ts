import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import * as R from 'ramda';
import { appProviders } from '../app.provider';
import { ActivityService } from '../activity/activity.service';
import { AffiliateService } from '../affiliate/affiliate.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import generateAffiliate from '../../test/helper/generateAffiliate';
import generateUser from '../../test/helper/generateUser';
import { CreateUserInput } from './user.interface';
import { CreateActivityInput } from '../activity/activity.interface';
import { Affiliate, User } from 'src/graphql';


describe('UserResolver', () => {
  let resolver: UserResolver;
  let affiliate: Affiliate;
  let users: User[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...appProviders,
        UserResolver,
        {
          provide: UserService,
          useFactory: () => ({
            findByUsername: jest.fn((username: string) => {
              return R.find(R.propEq('username', username))(users); 
            }),
            create: jest.fn((input: CreateUserInput) => input),
          })
        },
        {
          provide: ActivityService,
          useFactory: () => ({
            create: jest.fn((input: CreateActivityInput) => input)
          })
        },
        {
          provide: AffiliateService,
          useFactory: () => ({
            findByCode: jest.fn((code: string) => {
              return (code ===  affiliate.code)? affiliate:null;
            })
          })
        }
      ],
    }).compile();

    users =  R.times(() => generateUser())(5);
    affiliate = generateAffiliate();
    resolver = module.get<UserResolver>(UserResolver);
  });


  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  it('should be defined', async () => {
    expect(resolver).toBeDefined();
  });


  describe('create', () => {
    it('should create user with affiliate', async () => {
      const user = generateUser();
      const response = await resolver.createUser({
        ...R.pick(['username', 'password'], user),
        affiliateCode: affiliate.code,
      }); 

      expect(R.pick(['username', 'password','affiliate'], response)).toEqual(
        {
          ...R.pick(['username', 'password'], user),
          affiliate: affiliate.id,
        }
      );
    });

    it('should create user without affiliate', async () => {
      const user = generateUser();
      const response = await resolver.createUser(R.pick(['username', 'password'], user)); 

      expect(R.pick(['username', 'password','affiliate'], response)).toEqual(
        {
          ...R.pick(['username', 'password'], user),
          affiliate: null,
        }
      );
    });

    it('should not create user with the same username', async () => {
      await expect(resolver.createUser(R.pick(['username', 'password'], users[0]))).rejects.toThrow();
    });

    it('should not create user with invalid affiliate code', async () => {
      await expect(resolver.createUser({
        ...R.pick(['username', 'password'], generateUser()),
        affiliateCode: '123ASADSF',
      })).rejects.toThrow();
    });
  })
});
