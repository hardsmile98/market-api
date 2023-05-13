import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto';
import { AdminGuard, JwtAuthGuard } from 'src/auth/guard';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get('/')
  getSettings() {
    return this.settingsService.getSettings();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/')
  updateSettings(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateSettings(dto);
  }
}
