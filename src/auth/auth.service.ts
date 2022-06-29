import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne({ where: { username } });
    if (user && user.password === password) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
