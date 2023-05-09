import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  image: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  description: string;
}
