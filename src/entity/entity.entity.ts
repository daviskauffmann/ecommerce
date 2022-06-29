import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class Entity {
  @PrimaryGeneratedColumn()
  id: number;
}
