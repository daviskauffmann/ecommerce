import { Controller } from '@nestjs/common';
import { EntityController } from '../src/entity/entity.controller';
import {
  ExampleDto,
  ExampleSearchQuery,
  ExampleSearchResponse,
} from './example.dto';
import { Example } from './example.entity';
import { ExampleService } from './example.service';

@Controller('')
export class ExampleController extends EntityController<
  Example,
  ExampleDto,
  ExampleSearchQuery,
  ExampleSearchResponse
> {
  constructor(exampleService: ExampleService) {
    super(exampleService, ExampleDto, ExampleSearchResponse);
  }
}
