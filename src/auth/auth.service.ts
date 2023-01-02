import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Role } from './role/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(username: string, password: string, email: string) {
    if (
      await this.userService.findOne({
        where: { username },
      })
    ) {
      throw new ConflictException();
    }

    const user = await this.userService.create({
      username,
      password,
      email,
      roles: [Role.User, ...(username === 'admin' ? [Role.Admin] : [])],
    });

    return this.generateTokens(user);
  }

  async login(user: User) {
    return this.generateTokens(user);
  }

  async refresh(userId: number) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new ForbiddenException();
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          sub: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
        },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
        },
      ),
      accessTokenExpiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
      refreshToken: this.jwtService.sign(
        {
          sub: user.id,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        },
      ),
      refreshTokenExpiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    };
  }
}
