import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
