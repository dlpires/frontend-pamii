import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ListComandaItemDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_comanda?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_produto?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  qtd_item?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  statusPg?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  statusEntrega?: boolean;

}