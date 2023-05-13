import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, DeleteProductDto, UpdateProductDto } from './dto';
import { AdminGuard, JwtAuthGuard } from 'src/auth/guard';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/')
  addProduct(@Body() dto: CreateProductDto) {
    return this.productService.addProduct(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/update')
  update(@Body() dto: UpdateProductDto) {
    return this.productService.updateProduct(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/')
  deleteProduct(@Body() dto: DeleteProductDto) {
    return this.productService.deleteProduct(dto);
  }
}
