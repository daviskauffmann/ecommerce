import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityFactory } from '../../test/entity.factory';
import { ExampleController } from '../../test/example.controller';
import {
  ExampleDto,
  ExampleSearchQuery,
  ExampleSearchResponse,
} from '../../test/example.dto';
import { ExampleService } from '../../test/example.service';

describe('EntityController', () => {
  let controller: ExampleController;

  let exampleService: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        {
          provide: ExampleService,
          useFactory: () => ({
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn(),
            findOne: jest.fn(),
            findOneById: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);

    exampleService = module.get<ExampleService>(ExampleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should search', async () => {
    const examples = [EntityFactory.example()];
    const query: ExampleSearchQuery = {};

    jest
      .spyOn(exampleService, 'findMany')
      .mockImplementation(async () => ({ entities: examples }));

    const response = await controller.search(query);

    expect(exampleService.findMany).toHaveBeenCalledWith(
      {
        select: undefined,
        relations: undefined,
        order: undefined,
        skip: undefined,
        take: undefined,
        where: {},
      },
      undefined,
    );
    expect(response).toBeInstanceOf(ExampleSearchResponse);
    expect(response.items).toEqual(
      examples.map((testEntity) => new ExampleDto(testEntity)),
    );
    expect(response.count).toBeUndefined();
  });

  it('should create', async () => {
    const example = EntityFactory.example();
    const body = {
      string: example.string,
    };

    jest
      .spyOn(exampleService, 'create')
      .mockImplementation(async () => example);

    const response = await controller.create(body);

    expect(exampleService.create).toHaveBeenCalledWith(body);
    expect(response).toEqual(new ExampleDto(example));
  });

  it('should get', async () => {
    const example = EntityFactory.example();
    const params = { id: example.id };
    const query = {};

    jest
      .spyOn(exampleService, 'findOne')
      .mockImplementation(async () => example);

    const response = await controller.read(params, query);

    expect(exampleService.findOne).toHaveBeenCalledWith({
      select: undefined,
      relations: undefined,
      where: { id: params.id },
    });
    expect(response).toBeInstanceOf(ExampleDto);
    expect(response).toEqual(new ExampleDto(example));
  });

  it('should fail to get', async () => {
    const id = faker.datatype.number();
    const params = { id };
    const query = {};

    jest.spyOn(exampleService, 'findOne').mockImplementation(async () => null);

    await expect(controller.read(params, query)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(exampleService.findOne).toHaveBeenCalledWith({
      select: undefined,
      relations: undefined,
      where: { id: params.id },
    });
  });

  it('should update', async () => {
    const example = EntityFactory.example();
    const params = {
      id: example.id,
    };
    const body = {
      string: faker.random.word(),
    };
    const merged = EntityFactory.example({
      string: body.string,
    });

    jest
      .spyOn(exampleService, 'findOneById')
      .mockImplementation(async () => example);
    jest.spyOn(exampleService, 'update').mockImplementation(async () => merged);

    const response = await controller.update(params, body);

    expect(exampleService.findOneById).toHaveBeenCalledWith(params.id);
    expect(exampleService.update).toHaveBeenCalledWith(example, body);
    expect(response).toEqual(new ExampleDto(merged));
  });

  it('should fail to update', async () => {
    const params = { id: faker.datatype.number() };
    const body = {};

    jest
      .spyOn(exampleService, 'findOneById')
      .mockImplementation(async () => null);

    await expect(controller.update(params, body)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(exampleService.findOneById).toHaveBeenCalledWith(params.id);
  });

  it('should delete', async () => {
    const example = EntityFactory.example();
    const params = {
      id: example.id,
    };

    jest
      .spyOn(exampleService, 'findOneById')
      .mockImplementation(async () => example);
    jest
      .spyOn(exampleService, 'delete')
      .mockImplementation(async () => undefined);

    const response = await controller.delete(params);

    expect(exampleService.findOneById).toHaveBeenCalledWith(params.id);
    expect(exampleService.delete).toHaveBeenCalledWith(example);
    expect(response).toBeUndefined();
  });

  it('should fail to delete', async () => {
    const params = { id: faker.datatype.number() };

    jest
      .spyOn(exampleService, 'findOneById')
      .mockImplementation(async () => null);

    await expect(controller.delete(params)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(exampleService.findOneById).toHaveBeenCalledWith(params.id);
  });
});
