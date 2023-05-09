import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  price: string;

  oldPrice?: string;

  @IsNotEmpty()
  description: string;
}
