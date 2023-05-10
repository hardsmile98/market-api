import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSettingsDto } from './dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    const settings = await this.prisma.settings.findFirst();

    if (!settings) {
      const createSettings = await this.prisma.settings.create({ data: {} });

      return createSettings;
    }

    return settings;
  }

  async updateSettings(dto: UpdateSettingsDto) {
    const { id, ...otherData } = dto;

    return await this.prisma.settings.update({
      where: {
        id: id,
      },
      data: otherData,
    });
  }
}
