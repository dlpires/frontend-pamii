import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ICreateProdutoInput } from '../interfaces/produto.interface';

export class CreateProdutoDto implements ICreateProdutoInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  dsc_produto: string;

  @IsNumber()
  @IsNotEmpty()
  valor_unit: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
