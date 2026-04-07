import { IsInt, IsOptional, IsString } from 'class-validator';

export class ListUsuarioDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  usuario?: string;

  @IsInt()
  @IsOptional()
  perfil?: number;
}
