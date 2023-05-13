import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AdminGuard, JwtAuthGuard } from 'src/auth/guard';
import { CreateOrderDto, DeleteOrderDto, UpdateOrderDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getOrders(@GetUser() user: User) {
    return this.ordersService.getOrders(user);
  }

  @Get('/:uuid')
  getProduct(@Param('uuid') uuid: string) {
    return this.ordersService.getOrder(uuid);
  }

  @Post('/')
  addOrder(@GetUser() user: User, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(user, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/update')
  updateOrder(@Body() dto: UpdateOrderDto) {
    return this.ordersService.updateOrder(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/')
  deleteOrder(@Body() dto: DeleteOrderDto) {
    return this.ordersService.deleteOrder(dto);
  }
}
