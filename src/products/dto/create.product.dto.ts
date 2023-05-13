import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
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
