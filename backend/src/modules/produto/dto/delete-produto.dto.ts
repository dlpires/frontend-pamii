import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteProdutoDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
