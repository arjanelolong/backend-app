import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../graphql';
import * as R from 'ramda';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private usersService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = (await this.usersService.findAll({username: username })).pop();
    if (user && user.password === password) {
      return R.pick(['username','id'], user);
    }
    return null;
  }

  async generateUserCredentials(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return this.jwtTokenService.sign(payload);
  }

}
