import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  price: string;

  @IsOptional()
  oldPrice?: string;

  @IsNotEmpty()
  description: string;
}
