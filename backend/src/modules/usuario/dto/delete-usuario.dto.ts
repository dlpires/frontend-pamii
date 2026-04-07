import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteUsuarioDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}