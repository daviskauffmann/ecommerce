import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Order } from 'src/order/order.entity';
import { EntityDto, SearchQuery, SearchResponse } from '../entity/entity.dto';
import { FindManyResult } from '../entity/entity.service';
import { Product } from './product.entity';

export class ProductDto extends EntityDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  orders?: Order[];

  constructor(product: Product) {
    super(product);
    this.name = product.name;
    this.description = product.description;
    this.orders = product.orders;
  }
}

export class ProductSearchQuery extends SearchQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class ProductSearchResponse extends SearchResponse<ProductDto, Product> {
  @ApiProperty({ type: [ProductDto] })
  items: ProductDto[];

  constructor(result: FindManyResult<Product>) {
    super(result);
    this.items = result.entities.map((product) => new ProductDto(product));
  }
}

export class ProductCreateBody {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class ProductUpdateBody {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
