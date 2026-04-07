import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoDto } from './create-produto.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IUpdateProdutoInput } from '../interfaces/produto.interface';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) implements IUpdateProdutoInput {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
