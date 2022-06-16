import { UserSchema } from './user/user.model';
import { connect, Connection } from 'mongoose';
import { ActivitySchema } from './activity/activity.model';
import { AffiliateSchema } from './affiliate/affiliate.model';

export const appProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () =>
      connect(
        `${
          process.env.MONGODB_URI || 'mongodb://localhost/'
        }test-app-005?retryWrites=true&w=majority`,
      ),
  },
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ACTIVITY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Activity', ActivitySchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'AFFILIATE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Affiliate', AffiliateSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
