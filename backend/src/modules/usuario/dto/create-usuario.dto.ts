import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsInt()
  @IsOptional()
  perfil?: number;
}