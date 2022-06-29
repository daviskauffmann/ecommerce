import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { EntityDto, SearchQuery, SearchResponse } from '../entity/entity.dto';
import { FindManyResult } from '../entity/entity.service';
import { Order } from './order.entity';

export class OrderDto extends EntityDto {
  @ApiProperty()
  productId: number;

  constructor(order: Order) {
    super(order);
    this.productId = order.productId;
  }
}

export class OrderSearchQuery extends SearchQuery {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  productId?: number;
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
}

export class OrderUpdateBody {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  productId?: number;
}
