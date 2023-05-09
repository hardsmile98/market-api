import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, DeleteProductDto } from './dto';
import { isNumber } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    const items = await this.prisma.product.findMany();
    return { items };
  }

  async getProduct(id: string) {
    const formattedId = Number(id);

    if (!isNumber(formattedId)) {
      throw new BadRequestException('Incorrect id');
    }

    const item = await this.prisma.product.findFirst({
      where: { id: formattedId },
    });

    return { item };
  }

  async addProduct(dto: CreateProductDto) {
    return await this.prisma.product.create({ data: dto });
  }

  async deleteProduct(dto: DeleteProductDto) {
    if (!isNumber(dto.id)) {
      throw new BadRequestException('Incorrect id');
    }

    return await this.prisma.product.delete({ where: { id: dto.id } });
  }
}
