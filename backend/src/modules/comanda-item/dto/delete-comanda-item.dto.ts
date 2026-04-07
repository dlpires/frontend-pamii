import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteComandaItemDto {
  @IsInt()
  @IsNotEmpty()
  id_comanda: number;

  @IsInt()
  @IsNotEmpty()
  id_produto: number;
}