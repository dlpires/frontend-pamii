import { Controller, Param, Post, Body, Get, Patch, Delete, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { IUsuarioOutput } from './interfaces/usuario.interface';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ListUsuarioDto } from './dto/list-usuario.dto';
import { DeleteUsuarioDto } from './dto/delete-usuario.dto';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<IUsuarioOutput> {
        return await this.usuarioService.create(createUsuarioDto);
    }

    @Get()
    async findAll(@Query() listUsuarioDto: ListUsuarioDto): Promise<IUsuarioOutput[]> {
        return await this.usuarioService.findAll(listUsuarioDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<IUsuarioOutput> {
        return await this.usuarioService.findOne(id);
    }

    @Get('usuario/:usuario')
    async findByUsuario(@Param('usuario') usuario: string): Promise<IUsuarioOutput> {
        return await this.usuarioService.findByUsuario(usuario);
    }

    @Get('perfil/:perfil')
    async findByPerfil(@Param('perfil') perfil: number): Promise<IUsuarioOutput> {
        return await this.usuarioService.findByPerfil(perfil);
    }

    @Post('login')
    async login(usuario: string, senha: string): Promise<IUsuarioOutput> {
        return await this.usuarioService.login(usuario, senha);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<IUsuarioOutput> {
        return await this.usuarioService.update(id, updateUsuarioDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<DeleteUsuarioDto> {
        return await this.usuarioService.remove(id);
    }
}
