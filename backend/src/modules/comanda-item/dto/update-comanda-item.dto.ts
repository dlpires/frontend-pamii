import { PartialType } from '@nestjs/mapped-types';
import { CreateComandaItemDto } from './create-comanda-item.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IUpdateComandaItemInput } from '../interfaces/comanda-item.interface';

export class UpdateComandaItemDto extends PartialType(CreateComandaItemDto) implements IUpdateComandaItemInput {
  @IsInt()
  @IsNotEmpty()
  id_comanda: number;

  @IsInt()
  @IsNotEmpty()
  id_produto: number;
}