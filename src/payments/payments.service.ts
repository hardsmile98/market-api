import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto, DeletePaymentDto } from './dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async getPayments() {
    return await this.prisma.payments.findMany();
  }

  async getPaymentById(id: number) {
    return await this.prisma.payments.findFirst({
      where: { id: id },
    });
  }

  async createPayment(dto: CreatePaymentDto) {
    return await this.prisma.payments.create({ data: dto });
  }

  async deletePayment(dto: DeletePaymentDto) {
    return await this.prisma.payments.delete({ where: { id: dto.id } });
  }
}
