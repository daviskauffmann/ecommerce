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
import { ArrayOverlap } from 'typeorm';
import { AccessTokenGuard } from '../auth/access-token/access-token.guard';
import { Roles } from '../auth/role/role.decorator';
import { Role } from '../auth/role/role.enum';
import { RoleGuard } from '../auth/role/role.guard';
import { EntityController } from '../entity/entity.controller';
import { HttpError, ReadParams, ReadQuery } from '../entity/entity.dto';
import {
  ProductCreateBody,
  ProductDto,
  ProductSearchQuery,
  ProductSearchResponse,
  ProductUpdateBody,
} from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('api/products')
@ApiTags('Products')
export class ProductController extends EntityController<
  Product,
  ProductDto,
  ProductSearchQuery,
  ProductSearchResponse
> {
  constructor(productService: ProductService) {
    super(productService, ProductDto, ProductSearchResponse);
  }

  @Get()
  @ApiOkResponse({ type: ProductSearchResponse })
  public async search(@Query() query: ProductSearchQuery) {
    if (query.categories) {
      query.categories = ArrayOverlap((query.categories as string).split(','));
    }
    return super.search(query);
  }

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post()
  @ApiOkResponse({ type: ProductDto })
  public async create(@Body() body: ProductCreateBody) {
    return super.create(body);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ type: HttpError })
  public async read(@Param() params: ReadParams, @Query() query: ReadQuery) {
    return super.read(params, query);
  }

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(Role.Admin)
  @Put(':id')
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ type: HttpError })
  public update(@Param() params: ReadParams, @Body() body: ProductUpdateBody) {
    return super.update(params, body);
  }

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: HttpError })
  public delete(@Param() params: ReadParams) {
    return super.delete(params);
  }
}
