import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { UserService } from '../../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.userService.findOne({ where: { username } });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
    }
    throw new UnauthorizedException();
  }
}
