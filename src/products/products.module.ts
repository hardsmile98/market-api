import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SettingsService } from 'src/settings/settings.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, SettingsService],
})
export class ProductsModule {}
