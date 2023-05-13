import { Status } from '@prisma/client';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsIn(['paid', 'await'])
  status: Status;
}
