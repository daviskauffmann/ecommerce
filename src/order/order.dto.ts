import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { EntityDto, SearchQuery, SearchResponse } from '../entity/entity.dto';
import { FindManyResult } from '../entity/entity.service';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { Order, OrderState } from './order.entity';

export class OrderDto extends EntityDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty({ enum: OrderState })
  state: OrderState;

  @ApiProperty({ required: false })
  user?: User;

  @ApiProperty({ required: false })
  product?: Product;

  constructor(order: Order) {
    super(order);
    this.userId = order.userId;
    this.productId = order.productId;
    this.state = order.state;
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

  @ApiProperty({ enum: OrderState, required: false })
  @IsEnum(OrderState)
  @IsOptional()
  state?: OrderState;
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

  @ApiProperty({ enum: OrderState })
  @IsEnum(OrderState)
  state: OrderState;
}

export class OrderUpdateBody {}

export class OrderPlaceBody {
  @ApiProperty()
  @IsNumber()
  productId: number;
}
