import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ICreateComandaItemInput } from '../interfaces/comanda-item.interface';

export class CreateComandaItemDto implements ICreateComandaItemInput {
  @IsNumber()
  @IsNotEmpty()
  id_comanda: number;

  @IsNumber()
  @IsNotEmpty()
  id_produto: number;

  @IsNumber()
  @IsNotEmpty()
  qtd_item: number;

  @IsNumber()
  @IsNotEmpty()
  valor_venda: number;

  @IsBoolean()
  @IsOptional()
  statusPg?: boolean;

  @IsBoolean()
  @IsOptional()
  statusEntrega?: boolean;
}
