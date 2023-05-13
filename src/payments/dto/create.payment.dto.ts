import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  requisites: string;
}
