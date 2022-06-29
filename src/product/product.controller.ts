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

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: ProductSearchResponse })
  public async search(@Query() query: ProductSearchQuery) {
    return super.search(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOkResponse({ type: ProductDto })
  public async create(@Body() body: ProductCreateBody) {
    return super.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ type: HttpError })
  public async read(@Param() params: ReadParams, @Query() query: ReadQuery) {
    return super.read(params, query);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ type: HttpError })
  public update(@Param() params: ReadParams, @Body() body: ProductUpdateBody) {
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
