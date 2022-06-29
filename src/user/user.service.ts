import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { EntityService } from '../entity/entity.service';
import { User } from './user.entity';

@Injectable()
export class UserService extends EntityService<User> {
  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findOne(options?: FindOneOptions<User>): Promise<User> {
    return { id: 1, username: 'username', password: 'password' };
  }
}
