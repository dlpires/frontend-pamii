import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ListProdutoDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @IsString()
  dsc_produto?: string;
}
