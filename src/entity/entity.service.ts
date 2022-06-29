import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Entity } from './entity.entity';

export class FindManyResult<T extends Entity> {
  constructor(public entities: T[], public count?: number) {}
}

export abstract class EntityService<T extends Entity> {
  constructor(private repository: Repository<T>) {}

  async create(prototype: DeepPartial<T>) {
    const entity = this.repository.create(prototype);
    await this.repository.save(entity);
    return entity;
  }

  async update(entity: T, update: DeepPartial<T>) {
    entity = this.repository.merge(entity, update);
    await this.repository.save(entity);
    return entity;
  }

  async delete(entity: T) {
    await this.repository.remove(entity);
  }

  async findMany(options?: FindManyOptions<T>, count?: boolean) {
    if (count) {
      const [entities, count] = await this.repository.findAndCount(options);
      return new FindManyResult(entities, count);
    } else {
      const entities = await this.repository.find(options);
      return new FindManyResult(entities);
    }
  }

  findOne(options?: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  findOneById(id: number) {
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }
}
