import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ListMesaDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  qtd_cadeiras?: number;
}