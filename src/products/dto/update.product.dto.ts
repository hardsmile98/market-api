import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  price: number;

  @IsOptional()
  oldPrice?: number;

  @IsNotEmpty()
  description: string;
}
