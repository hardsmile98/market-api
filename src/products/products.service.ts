import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, DeleteProductDto, UpdateProductDto } from './dto';
import { isNumber } from 'class-validator';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private settingsService: SettingsService,
  ) {}

  async getProducts() {
    const { currency } = await this.settingsService.getSettings();

    const items = await this.prisma.product.findMany();

    return { items, currency };
  }

  async getProduct(id: string) {
    const formattedId = Number(id);

    if (!isNumber(formattedId)) {
      throw new BadRequestException('Incorrect id');
    }

    const { currency } = await this.settingsService.getSettings();

    const item = await this.prisma.product.findFirst({
      where: { id: formattedId },
    });

    return { item, currency };
  }

  async addProduct(dto: CreateProductDto) {
    return await this.prisma.product.create({ data: dto });
  }

  async deleteProduct(dto: DeleteProductDto) {
    return await this.prisma.product.delete({ where: { id: dto.id } });
  }

  async getProductById(id: number) {
    return await this.prisma.product.findFirst({
      where: { id: id },
    });
  }

  async updateProduct(dto: UpdateProductDto) {
    const { id, oldPrice, ...otherData } = dto;

    return await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...otherData,
        oldPrice: oldPrice ? oldPrice : null,
      },
    });
  }
}
