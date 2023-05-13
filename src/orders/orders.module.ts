import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PaymentsService } from 'src/payments/payments.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [OrdersService, PaymentsService, AuthService, JwtService],
  controllers: [OrdersController],
})
export class OrderModule {}
