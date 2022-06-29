import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityService } from '../src/entity/entity.service';
import { Example } from './example.entity';

@Injectable()
export class ExampleService extends EntityService<Example> {
  constructor(
    @InjectRepository(Example)
    productRepository: Repository<Example>,
  ) {
    super(productRepository);
  }
}
