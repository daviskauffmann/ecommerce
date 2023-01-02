import { Column, Entity as Table, OneToMany } from 'typeorm';
import { Role } from '../auth/role/role.enum';
import { Entity } from '../entity/entity.entity';
import { Order } from '../order/order.entity';

@Table()
export class User extends Entity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('text', { array: true })
  roles: Role[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
