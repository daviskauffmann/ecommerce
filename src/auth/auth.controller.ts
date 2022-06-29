import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as express from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: express.Request) {
    return this.authService.login(req.user as any);
  }
}
