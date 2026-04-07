import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteMesaDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}