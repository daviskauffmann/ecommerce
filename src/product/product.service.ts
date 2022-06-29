import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityService } from '../entity/entity.service';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends EntityService<Product> {
  constructor(
    @InjectRepository(Product)
    productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}
