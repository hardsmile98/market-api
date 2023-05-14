import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CancelOrderDto,
  CreateOrderDto,
  DeleteOrderDto,
  UpdateOrderDto,
} from './dto';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { PaymentsService } from 'src/payments/payments.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private paymentsService: PaymentsService,
    private productsService: ProductsService,
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
        orderBy: {
          number: 'desc',
        },
      });

      return { orders };
    }

    // Администратору все заказы
    const orders = await this.prisma.order.findMany({
      orderBy: {
        number: 'desc',
      },
    });

    return { orders };
  }

  async getOrder(uuid: string) {
    const order = await this.prisma.order.findFirst({
      where: { uuid },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const payment = await this.paymentsService.getPaymentById(order.paymentId);

    const product = await this.productsService.getProductById(order.productId);

    return {
      order: {
        ...order,
        payment,
        product,
      },
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

  async cancelOrder(dto: CancelOrderDto) {
    const { uuid } = dto;

    return await this.prisma.order.update({
      where: {
        uuid,
      },
      data: {
        status: 'cancel',
      },
    });
  }

  async deleteOrder(dto: DeleteOrderDto) {
    return await this.prisma.order.delete({ where: { uuid: dto.uuid } });
  }
}
