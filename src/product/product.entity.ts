import { Column, Entity as Table, OneToMany } from 'typeorm';
import { Entity } from '../entity/entity.entity';
import { Order } from '../order/order.entity';

@Table()
export class Product extends Entity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Order, (order) => order.productId)
  orders: Order[];
}
