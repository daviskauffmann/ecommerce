import { Column, Entity as Table } from 'typeorm';
import { Entity } from '../entity/entity.entity';

@Table()
export class User extends Entity {
  @Column()
  username: string;

  @Column()
  password: string;
}
