import { PartialType } from '@nestjs/mapped-types';
import { CreateComandaDto } from './create-comanda.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IUpdateComandaInput } from '../interfaces/comanda.interface';

export class UpdateComandaDto extends PartialType(CreateComandaDto) implements IUpdateComandaInput {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
