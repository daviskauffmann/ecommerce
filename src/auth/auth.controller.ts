import {
  Body,
  ConflictException,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import * as express from 'express';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginResponse, RegisterBody } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { Role } from './role.enum';

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @ApiOkResponse({ type: LoginResponse })
  async register(@Body() { username, password, email }: RegisterBody) {
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
    return this.authService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  async login(@Request() req: express.Request) {
    return this.authService.login(req.user as User);
  }
}
