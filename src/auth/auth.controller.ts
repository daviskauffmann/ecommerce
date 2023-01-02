import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import * as express from 'express';
import { LoginResponse, RegisterBody } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './local/local.guard';
import { RefreshTokenGuard } from './refresh-token/refresh-token.guard';

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOkResponse({ type: LoginResponse })
  async register(@Body() { username, password, email }: RegisterBody) {
    return this.authService.register(username, password, email);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  async login(@Request() req: express.Request) {
    return this.authService.login(req.user);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiOkResponse({ type: LoginResponse })
  async refresh(@Request() req: express.Request) {
    return this.authService.refresh(req.user.id);
  }
}
