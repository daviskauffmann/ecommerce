import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';
import {
  EntityDto,
  ReadParams,
  ReadQuery,
  SearchQuery,
  SearchResponse,
} from './entity.dto';
import { Entity } from './entity.entity';
import { EntityService, FindManyResult } from './entity.service';

export abstract class EntityController<
  TEntity extends Entity,
  TEntityDto extends EntityDto,
  TSearchQuery extends SearchQuery,
  TSearchResponse extends SearchResponse<TEntityDto, TEntity>,
> {
  constructor(
    private service: EntityService<TEntity>,
    private entityDtoFactory: new (entity: TEntity) => TEntityDto,
    private findManyResponseFactory: new (
      result: FindManyResult<TEntity>,
    ) => TSearchResponse,
  ) {}

  public async search({
    select,
    relations,
    order,
    skip,
    take,
    count,
    ...where
  }: TSearchQuery) {
    const result = await this.service.findMany(
      {
        select: this.select(select),
        relations: this.relations(relations),
        order: this.order(order),
        skip,
        take,
        where: where as unknown as FindOptionsWhere<TEntity>,
      },
      count,
    );
    return new this.findManyResponseFactory(result);
  }

  public async create(body: DeepPartial<TEntity>) {
    const entity = await this.service.create(body);
    return new this.entityDtoFactory(entity);
  }

  public async read({ id }: ReadParams, { select, relations }: ReadQuery) {
    const entity = await this.service.findOne({
      select: this.select(select),
      relations: this.relations(relations),
      where: { id } as FindOptionsWhere<TEntity>,
    });
    if (!entity) {
      throw new NotFoundException();
    }
    return new this.entityDtoFactory(entity);
  }

  public async update({ id }: ReadParams, body: DeepPartial<TEntity>) {
    let entity = await this.service.findOneById(id);
    if (!entity) {
      throw new NotFoundException();
    }
    entity = await this.service.update(entity, body);
    return new this.entityDtoFactory(entity);
  }

  public async delete({ id }: ReadParams) {
    const entity = await this.service.findOneById(id);
    if (!entity) {
      throw new NotFoundException();
    }
    await this.service.delete(entity);
  }

  private select(select?: string) {
    return select?.split(',').reduce((select, field) => {
      select[field] = true;
      return select;
    }, {} as FindOptionsSelect<TEntity>);
  }

  private relations(relations?: string) {
    return relations?.split(',').reduce((relations, field) => {
      relations[field] = true;
      return relations;
    }, {} as FindOptionsRelations<TEntity>);
  }

  private order(order?: string) {
    return order?.split(',').reduce((order, clause) => {
      const [field, direction] = clause.split(':');
      order[field] = direction;
      return order;
    }, {} as FindOptionsOrder<TEntity>);
  }
}
