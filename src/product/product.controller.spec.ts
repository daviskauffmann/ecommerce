import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ArrayOverlap } from 'typeorm';
import { EntityController } from '../entity/entity.controller';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should search and convert categories string into FindOperator', async () => {
    const categories = `${faker.word.sample()},${faker.word.sample()}`;
    const query = { categories };

    jest
      .spyOn(EntityController.prototype, 'search')
      .mockImplementation(async () => undefined);

    await controller.search(query);

    expect(EntityController.prototype.search).toHaveBeenCalledWith({
      categories: ArrayOverlap(categories.split(',')),
    });
  });
});
