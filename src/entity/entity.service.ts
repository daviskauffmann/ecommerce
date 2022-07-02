import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Entity } from './entity.entity';

export class FindManyResult<TEntity extends Entity> {
  constructor(public entities: TEntity[], public count?: number) {}
}

export abstract class EntityService<TEntity extends Entity> {
  constructor(private repository: Repository<TEntity>) {}

  async create(prototype: DeepPartial<TEntity>) {
    const entity = this.repository.create(prototype);
    await this.repository.save(entity);
    return entity;
  }

  async update(entity: TEntity, update: DeepPartial<TEntity>) {
    entity = this.repository.merge(entity, update);
    await this.repository.save(entity);
    return entity;
  }

  async delete(entity: TEntity) {
    await this.repository.remove(entity);
  }

  async findMany(options?: FindManyOptions<TEntity>, count?: boolean) {
    if (count) {
      const [entities, count] = await this.repository.findAndCount(options);
      return new FindManyResult(entities, count);
    } else {
      const entities = await this.repository.find(options);
      return new FindManyResult(entities);
    }
  }

  findOne(options?: FindOneOptions<TEntity>): Promise<TEntity | null> {
    return this.repository.findOne(options);
  }

  findOneById(id: number) {
    return this.repository.findOneBy({ id } as FindOptionsWhere<TEntity>);
  }
}
