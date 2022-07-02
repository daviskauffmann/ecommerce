import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ArrayOverlap } from 'typeorm';
import { EntityController } from '../entity/entity.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should search and convert categories string into FindOperator', async () => {
    const categories = `${faker.random.word()},${faker.random.word()}`;
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
