import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, DeleteProductDto } from './dto';

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

  @Post('/')
  addProduct(@Body() dto: CreateProductDto) {
    return this.productService.addProduct(dto);
  }

  @Delete('/')
  deleteProduct(@Body() dto: DeleteProductDto) {
    return this.productService.deleteProduct(dto);
  }
}
