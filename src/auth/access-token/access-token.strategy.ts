import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../user/user.entity';
import { Role } from '../role/role.enum';

export class AccessTokenPayload {
  sub: number;
  username: string;
  email: string;
  roles: Role[];
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: AccessTokenPayload) {
    const user = new User();
    user.id = payload.sub;
    user.username = payload.username;
    user.email = payload.email;
    user.roles = payload.roles;
    return user;
  }
}
