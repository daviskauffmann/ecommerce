import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Entity } from './entity.entity';
import { FindManyResult } from './entity.service';

export abstract class EntityDto {
  @ApiProperty()
  id: number;

  constructor(entity: Entity) {
    this.id = entity.id;
  }
}

export class HttpError {
  @ApiProperty()
  @IsNumber()
  statusCode: number;

  @ApiProperty()
  @IsString()
  message: string;
}

export class SearchQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  select?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  relations?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  order?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  skip?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  take?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  count?: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  id?: number;
}

export class ReadParams {
  @ApiProperty()
  @IsNumber()
  id?: number;
}

export class ReadQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  select?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  relations?: string;
}

export abstract class SearchResponse<T extends EntityDto, V extends Entity> {
  abstract items: T[];

  @ApiProperty({ required: false })
  count?: number;

  constructor(result: FindManyResult<V>) {
    this.count = result.count;
  }
}
