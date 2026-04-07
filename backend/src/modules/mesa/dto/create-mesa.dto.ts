import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { ICreateMesaInput } from '../interfaces/mesa.interface';

export class CreateMesaDto implements ICreateMesaInput {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  qtd_cadeiras: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}