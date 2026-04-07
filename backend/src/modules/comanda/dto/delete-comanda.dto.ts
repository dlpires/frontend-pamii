import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteComandaDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}