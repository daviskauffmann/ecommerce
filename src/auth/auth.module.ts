import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AccessTokenStrategy } from './access-token/access-token.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local/local.strategy';
import { RefreshTokenStrategy } from './refresh-token/refresh-token.strategy';

@Module({
  imports: [ConfigModule, JwtModule, PassportModule, UserModule],
  providers: [
    AccessTokenStrategy,
    AuthService,
    LocalStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
