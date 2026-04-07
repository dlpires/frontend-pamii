import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ListComandaDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_mesa?: number;
}