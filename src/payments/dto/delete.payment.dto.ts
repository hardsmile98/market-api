import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeletePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
