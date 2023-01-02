import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeepPartial, Repository } from 'typeorm';
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

  async create(prototype: DeepPartial<User>) {
    prototype.password = await this.hashPassword(prototype.password);

    return super.create(prototype);
  }

  async update(entity: User, update: DeepPartial<User>) {
    if (update.password) {
      update.password = await this.hashPassword(update.password);
    }

    return super.update(entity, update);
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
