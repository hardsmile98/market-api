import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, DeleteOrderDto, UpdateOrderDto } from './dto';
import { Order, Payments, User } from '@prisma/client';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private paymentsService: PaymentsService,
  ) {}

  formatterOrders(orders: Order[], payments: Payments[]) {
    return orders.map((order) => ({
      ...order,
      payment: payments.find((payment) => payment.id === order.paymentId),
    }));
  }

  async createOrder(user: User, dto: CreateOrderDto) {
    const { price } = await this.prisma.product.findFirst({
      where: { id: dto.productId },
    });

    const total = price * dto.count;

    return await this.prisma.order.create({
      data: { ...dto, total, userId: user.id },
    });
  }

  async getOrders(user: User) {
    const { role } = user;

    const payments = await this.paymentsService.getPayments();

    // Отдаем пользователю только свои заказы
    if (role === 'USER') {
      const orders = await this.prisma.order.findMany({
        where: { userId: user.id },
      });

      return { orders: this.formatterOrders(orders, payments) };
    }

    // Администратору все заказы
    const orders = await this.prisma.order.findMany();

    return { orders: this.formatterOrders(orders, payments) };
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
