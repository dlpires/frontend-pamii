import { PartialType } from '@nestjs/mapped-types';
import { CreateMesaDto } from './create-mesa.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IUpdateMesaInput } from '../interfaces/mesa.interface';

export class UpdateMesaDto extends PartialType(CreateMesaDto) implements IUpdateMesaInput {
  @IsInt()
  @IsNotEmpty()
  id: number;
}