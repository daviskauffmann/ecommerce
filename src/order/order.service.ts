import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityService } from '../entity/entity.service';
import { Order } from './order.entity';

@Injectable()
export class OrderService extends EntityService<Order> {
  constructor(
    @InjectRepository(Order)
    orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }
}
