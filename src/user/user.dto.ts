import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../auth/role.enum';
import { EntityDto, SearchQuery, SearchResponse } from '../entity/entity.dto';
import { FindManyResult } from '../entity/entity.service';
import { Order } from '../order/order.entity';
import { ProductDto } from '../product/product.dto';
import { User } from './user.entity';

export class UserDto extends EntityDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Role, isArray: true })
  roles: Role[];

  @ApiProperty({ required: false })
  orders?: Order[];

  constructor(user: User) {
    super(user);
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.roles = user.roles;
    this.orders = user.orders;
  }
}

export class UserSearchQuery extends SearchQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UserSearchResponse extends SearchResponse<UserDto, User> {
  @ApiProperty({ type: [ProductDto] })
  items: UserDto[];

  constructor(result: FindManyResult<User>) {
    super(result);
    this.items = result.entities.map((user) => new UserDto(user));
  }
}

export class UserCreateBody {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: Role, isArray: true })
  @IsEnum(Role, { each: true })
  roles: Role[];
}

export class UserUpdateBody {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ enum: Role, isArray: true, required: false })
  @IsEnum(Role, { each: true })
  @IsOptional()
  roles?: Role[];
}
