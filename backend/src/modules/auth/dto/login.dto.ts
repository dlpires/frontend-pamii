import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  usuario: string;

  @IsNotEmpty()
  @IsString()
  senha: string;
}
