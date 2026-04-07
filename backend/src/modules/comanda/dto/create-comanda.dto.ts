import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ICreateComandaInput } from '../interfaces/comanda.interface';

export class CreateComandaDto implements ICreateComandaInput {
  @IsInt()
  @IsNotEmpty()
  id_mesa: number;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  obs_comanda?: string;
}