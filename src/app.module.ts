import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Order } from './order/order.entity';
import { OrderModule } from './order/order.module';
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Order, Product, User],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
    }),
    AuthModule,
    OrderModule,
    ProductModule,
    UserModule,
  ],
})
export class AppModule {}
