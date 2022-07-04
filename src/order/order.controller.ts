import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import * as express from 'express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/role.dectorator';
import { Role } from '../auth/role.enum';
import { RoleGuard } from '../auth/role.guard';
import { EntityController } from '../entity/entity.controller';
import { HttpError, ReadParams, ReadQuery } from '../entity/entity.dto';
import { User } from '../user/user.entity';
import {
  OrderCreateBody,
  OrderDto,
  OrderPlaceBody,
  OrderSearchQuery,
  OrderSearchResponse,
  OrderUpdateBody,
} from './order.dto';
import { Order, OrderState } from './order.entity';
import { OrderService } from './order.service';

@Controller('api/orders')
@ApiTags('Orders')
export class OrderController extends EntityController<
  Order,
  OrderDto,
  OrderSearchQuery,
  OrderSearchResponse
> {
  constructor(orderService: OrderService) {
    super(orderService, OrderDto, OrderSearchResponse);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User)
  @Get()
  @ApiOkResponse({ type: OrderSearchResponse })
  public async search(
    @Query() query: OrderSearchQuery,
    @Request() req?: express.Request,
  ) {
    if (!(req?.user as User).roles.includes(Role.Admin)) {
      query.userId = (req.user as User).id;
    }
    return super.search(query);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post()
  @ApiOkResponse({ type: OrderDto })
  public async create(@Body() body: OrderCreateBody) {
    return super.create(body);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User)
  @Get(':id')
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse({ type: HttpError })
  public async read(
    @Param() params: ReadParams,
    @Query() query: ReadQuery,
    @Request() req?: express.Request,
  ) {
    const orderDto = await super.read(params, query);
    if (
      !(req?.user as User).roles.includes(Role.Admin) &&
      orderDto.userId !== (req?.user as User).id
    ) {
      throw new UnauthorizedException();
    }
    return orderDto;
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Put(':id')
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse({ type: HttpError })
  public update(@Param() params: ReadParams, @Body() body: OrderUpdateBody) {
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

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User)
  @Post('/place')
  @ApiOkResponse({ type: OrderDto })
  public async place(
    @Body() body: OrderPlaceBody,
    @Request() req?: express.Request,
  ) {
    return super.create({
      userId: (req?.user as User).id,
      productId: body.productId,
      state: OrderState.Processing,
    });
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post('/:id/cancel')
  @ApiOkResponse({ type: OrderDto })
  public async cancel(@Param() params: ReadParams) {
    return super.update(params, {
      state: OrderState.Cancelled,
    });
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post('/:id/ship')
  @ApiOkResponse({ type: OrderDto })
  public async ship(@Param() params: ReadParams) {
    return super.update(params, {
      state: OrderState.Shipped,
    });
  }
}
