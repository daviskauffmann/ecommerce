import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { EntityDto, SearchQuery, SearchResponse } from '../entity/entity.dto';
import { FindManyResult } from '../entity/entity.service';
import { Order } from './order.entity';

export class OrderDto extends EntityDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty({ required: false })
  user?: User;

  @ApiProperty({ required: false })
  product?: Product;

  constructor(order: Order) {
    super(order);
    this.userId = order.userId;
    this.productId = order.productId;
    this.user = order.user;
    this.product = order.product;
  }
}

export class OrderSearchQuery extends SearchQuery {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  productId?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  userId?: number;
}

export class OrderSearchResponse extends SearchResponse<OrderDto, Order> {
  @ApiProperty({ type: [OrderDto] })
  items: OrderDto[];

  constructor(result: FindManyResult<Order>) {
    super(result);
    this.items = result.entities.map((order) => new OrderDto(order));
  }
}

export class OrderCreateBody {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;
}

export class OrderUpdateBody {}
