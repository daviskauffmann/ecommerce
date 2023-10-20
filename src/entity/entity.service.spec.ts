import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityFactory } from '../../test/entity.factory';
import { Example } from '../../test/example.entity';
import { ExampleService } from '../../test/example.service';
import { FindManyResult } from './entity.service';

describe('EntityService', () => {
  let service: ExampleService;

  let exampleRepository: Repository<Example>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        {
          provide: getRepositoryToken(Example),
          useFactory: () => ({
            create: jest.fn(),
            merge: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            find: jest.fn(),
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<ExampleService>(ExampleService);

    exampleRepository = module.get(getRepositoryToken(Example));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', async () => {
    const example = EntityFactory.example();
    const prototype = {
      string: example.string,
    };

    jest.spyOn(exampleRepository, 'create').mockImplementation(() => example);
    jest
      .spyOn(exampleRepository, 'save')
      .mockImplementation(async () => undefined);

    const entity = await service.create(prototype);

    expect(exampleRepository.create).toHaveBeenCalledWith(prototype);
    expect(exampleRepository.save).toHaveBeenCalledWith(example);
    expect(entity).toBeInstanceOf(Example);
    expect(entity).toEqual(example);
  });

  it('should update', async () => {
    const example = EntityFactory.example();
    const update = {
      string: faker.word.sample(),
    };
    const merged = EntityFactory.example({
      string: update.string,
    });

    jest.spyOn(exampleRepository, 'merge').mockImplementation(() => merged);
    jest
      .spyOn(exampleRepository, 'save')
      .mockImplementation(async () => undefined);

    const entity = await service.update(example, update);

    expect(exampleRepository.merge).toHaveBeenCalledWith(example, update);
    expect(exampleRepository.save).toHaveBeenCalledWith(merged);
    expect(entity).toBeInstanceOf(Example);
    expect(entity).toEqual(merged);
    expect(merged).not.toEqual(example);
  });

  it('should delete', async () => {
    const example = EntityFactory.example();

    jest
      .spyOn(exampleRepository, 'remove')
      .mockImplementation(async () => undefined);

    const result = await service.delete(example);

    expect(exampleRepository.remove).toHaveBeenCalledWith(example);
    expect(result).toBeUndefined();
  });

  it('should find many without count', async () => {
    const examples = [EntityFactory.example()];
    const options = {};

    jest
      .spyOn(exampleRepository, 'find')
      .mockImplementation(async () => examples);

    const result = await service.findMany(options);

    expect(exampleRepository.find).toHaveBeenCalledWith(options);
    expect(result).toBeInstanceOf(FindManyResult);
    expect(result.entities).toEqual(examples);
  });

  it('should find many with count', async () => {
    const examples = [EntityFactory.example()];
    const options = {};

    jest
      .spyOn(exampleRepository, 'findAndCount')
      .mockImplementation(async () => [examples, 1]);

    const result = await service.findMany(options, true);

    expect(exampleRepository.findAndCount).toHaveBeenCalledWith(options);
    expect(result).toBeInstanceOf(FindManyResult);
    expect(result.entities).toEqual(examples);
    expect(result.count).toBe(1);
  });

  it('should find one', async () => {
    const example = EntityFactory.example();
    const options = {};

    jest
      .spyOn(exampleRepository, 'findOne')
      .mockImplementation(async () => example);

    const entity = await service.findOne(options);

    expect(exampleRepository.findOne).toHaveBeenCalledWith(options);
    expect(entity).toBeInstanceOf(Example);
    expect(entity).toBe(example);
  });

  it('should find one by id', async () => {
    const example = EntityFactory.example();

    jest
      .spyOn(exampleRepository, 'findOneBy')
      .mockImplementation(async () => example);

    const entity = await service.findOneById(example.id);

    expect(exampleRepository.findOneBy).toHaveBeenCalledWith({
      id: example.id,
    });
    expect(entity).toBeInstanceOf(Example);
    expect(entity).toBe(example);
  });
});
