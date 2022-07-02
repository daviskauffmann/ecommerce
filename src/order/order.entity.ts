import { Column, Entity as Table, JoinColumn, ManyToOne } from 'typeorm';
import { Entity } from '../entity/entity.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Table()
export class Order extends Entity {
  @Column()
  userId: number;

  @Column()
  productId: number;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.orders)
  user?: User;

  @JoinColumn()
  @ManyToOne(() => Product, (product) => product.orders)
  product?: Product;
}
