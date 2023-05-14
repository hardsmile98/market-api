import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PaymentsService } from 'src/payments/payments.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ProductsService } from 'src/products/products.service';
import { SettingsService } from 'src/settings/settings.service';

@Module({
  providers: [
    OrdersService,
    PaymentsService,
    AuthService,
    JwtService,
    ProductsService,
    SettingsService,
  ],
  imports: [],
  controllers: [OrdersController],
})
export class OrderModule {}
