import { Column, Entity as TypeOrmEntity } from 'typeorm';
import { Entity } from '../src/entity/entity.entity';

@TypeOrmEntity()
export class Example extends Entity {
  @Column()
  string: string;
}
