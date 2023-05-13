import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, DeleteOrderDto, UpdateOrderDto } from './dto';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createOrder(auth: string, dto: CreateOrderDto) {
    const userId = await this.authService.getUserIdByHeader(auth);

    const { price } = await this.prisma.product.findFirst({
      where: { id: dto.productId },
    });

    const total = price * dto.count;

    return await this.prisma.order.create({
      data: { ...dto, total, userId },
    });
  }

  async getOrders(user: User) {
    const { role } = user;

    // Отдаем пользователю только свои заказы
    if (role === 'USER') {
      const orders = await this.prisma.order.findMany({
        where: { userId: user.id },
      });

      return { orders };
    }

    // Администратору все заказы
    const orders = await this.prisma.order.findMany();

    return { orders };
  }

  async getOrder(uuid: string) {
    const order = await this.prisma.order.findFirst({
      where: { uuid },
    });

    return {
      order,
    };
  }

  async updateOrder(dto: UpdateOrderDto) {
    const { uuid, status } = dto;

    return await this.prisma.order.update({
      where: {
        uuid,
      },
      data: {
        status,
      },
    });
  }

  async deleteOrder(dto: DeleteOrderDto) {
    return await this.prisma.order.delete({ where: { uuid: dto.uuid } });
  }
}
