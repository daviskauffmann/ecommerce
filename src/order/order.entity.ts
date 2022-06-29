import { Entity as Table, ManyToOne } from 'typeorm';
import { Entity } from '../entity/entity.entity';
import { Product } from '../product/product.entity';

@Table()
export class Order extends Entity {
  @ManyToOne(() => Product)
  productId: number;
}
