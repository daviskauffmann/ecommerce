import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/role.dectorator';
import { Role } from '../auth/role.enum';
import { RoleGuard } from '../auth/role.guard';
import { EntityController } from '../entity/entity.controller';
import { HttpError, ReadParams, ReadQuery } from '../entity/entity.dto';
import {
  UserCreateBody,
  UserDto,
  UserSearchQuery,
  UserSearchResponse,
  UserUpdateBody,
} from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api/users')
@ApiTags('Users')
export class UserController extends EntityController<
  User,
  UserDto,
  UserSearchQuery,
  UserSearchResponse
> {
  constructor(userService: UserService) {
    super(userService, UserDto, UserSearchResponse);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Get()
  @ApiOkResponse({ type: UserSearchResponse })
  public async search(@Query() query: UserSearchQuery) {
    return super.search(query);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post()
  @ApiOkResponse({ type: UserDto })
  public async create(@Body() body: UserCreateBody) {
    return super.create(body);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse({ type: HttpError })
  public async read(@Param() params: ReadParams, @Query() query: ReadQuery) {
    return super.read(params, query);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Put(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse({ type: HttpError })
  public update(@Param() params: ReadParams, @Body() body: UserUpdateBody) {
    return super.update(params, body);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: HttpError })
  public delete(@Param() params: ReadParams) {
    return super.delete(params);
  }
}
