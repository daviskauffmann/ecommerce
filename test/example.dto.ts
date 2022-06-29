import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import {
  EntityDto,
  SearchQuery,
  SearchResponse,
} from '../src/entity/entity.dto';
import { FindManyResult } from '../src/entity/entity.service';
import { Example } from './example.entity';

export class ExampleDto extends EntityDto {
  @ApiProperty()
  string: string;

  constructor(example: Example) {
    super(example);
  }
}

export class ExampleSearchQuery extends SearchQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  string?: string;
}

export class ExampleSearchResponse extends SearchResponse<ExampleDto, Example> {
  @ApiProperty({ type: [ExampleDto] })
  items: ExampleDto[];

  constructor(result: FindManyResult<Example>) {
    super(result);
    this.items = result.entities.map((example) => new ExampleDto(example));
  }
}

export class ExampleCreateBody {
  @ApiProperty()
  @IsString()
  string: string;
}
