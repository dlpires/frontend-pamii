import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsInt()
    @IsNotEmpty()
    id: number;
}