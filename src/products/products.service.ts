import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, DeleteProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    const items = await this.prisma.product.findMany();
    return { items };
  }

  async getProduct(id: string) {
    const formattedId = Number(id);

    const item = await this.prisma.product.findFirst({
      where: { id: formattedId },
    });

    return { item };
  }

  async addProduct(dto: CreateProductDto) {
    // Check is Admin
    return await this.prisma.product.create({ data: dto });
  }

  async deleteProduct(dto: DeleteProductDto) {
    // Check is Admin
    return await this.prisma.product.delete({ where: { id: dto.id } });
  }
}
