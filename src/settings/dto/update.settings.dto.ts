import { Currency } from '@prisma/client';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSettingsDto {
  @IsNumber()
  id: number;

  @IsOptional()
  bannerImg: string;

  @IsOptional()
  buttonText: string;

  @IsOptional()
  telegram: string;

  @IsString()
  textPrimary: string;

  @IsString()
  textSecondary: string;

  @IsString()
  secondaryMain: string;

  @IsString()
  secondaryDark: string;

  @IsString()
  secondaryLight: string;

  @IsString()
  backgroundDefault: string;

  @IsString()
  backgroundPaper: string;

  @IsString()
  gradient1: string;

  @IsString()
  gradient2: string;

  @IsIn(['RUB', 'USD', 'EUR'])
  currency: Currency;
}
