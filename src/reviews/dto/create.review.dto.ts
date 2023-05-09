import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  name: string;

  image: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  description: string;
}
