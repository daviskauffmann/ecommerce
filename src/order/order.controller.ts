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
import { EntityController } from '../entity/entity.controller';
import { HttpError, ReadParams, ReadQuery } from '../entity/entity.dto';
import {
  OrderCreateBody,
  OrderDto,
  OrderSearchQuery,
  OrderSearchResponse,
  OrderUpdateBody,
} from './order.dto';
import { Order } from './order.entity';
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

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: OrderSearchResponse })
  public async search(@Query() query: OrderSearchQuery) {
    return super.search(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOkResponse({ type: OrderDto })
  public async create(@Body() body: OrderCreateBody) {
    return super.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse({ type: HttpError })
  public async read(@Param() params: ReadParams, @Query() query: ReadQuery) {
    return super.read(params, query);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse({ type: HttpError })
  public update(@Param() params: ReadParams, @Body() body: OrderUpdateBody) {
    return super.update(params, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: HttpError })
  public delete(@Param() params: ReadParams) {
    return super.delete(params);
  }
}
