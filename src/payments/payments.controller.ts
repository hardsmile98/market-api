import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, DeletePaymentDto } from './dto';
import { AdminGuard, JwtAuthGuard } from 'src/auth/guard';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get('/')
  getPayments() {
    return this.paymentsService.getPayments();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/')
  addPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPayment(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/')
  deletePayment(@Body() dto: DeletePaymentDto) {
    return this.paymentsService.deletePayment(dto);
  }
}
