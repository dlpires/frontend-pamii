import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ListUsuarioDto } from './dto/list-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async create(createUsuarioDto: CreateUsuarioDto) {
        const usuario = this.usuarioRepository.create(createUsuarioDto);
        return await this.usuarioRepository.save(usuario);
    }

    async findAll(listUsuarioDto: ListUsuarioDto) {
        return await this.usuarioRepository.find({
            where: listUsuarioDto,
        });
    }

    async findOne(id: number) {
        const usuario = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuario) {
            throw new Error(`Usuário com ID ${id} não encontrado`);
        }
        return usuario;
    }

    async findByUsuario(usuario: string) {
        const user = await this.usuarioRepository.findOne({ where: { usuario } });
        if (!user) {
            throw new Error(`Usuário ${usuario} não encontrado`);
        }
        return user;
    }

    async findByPerfil(perfil: number) {
        const user = await this.usuarioRepository.findOne({ where: { perfil } });
        if (!user) {
            throw new Error(`Usuário com perfil ${perfil} não encontrado`);
        }
        return user;
    }

    async login(usuario: string, senha: string) {
        const user = await this.usuarioRepository.findOne({ where: { usuario, senha } })
        if (!user) {
            throw new Error(`Usuário ou senha inválidos`);
        }
        return user;
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        const usuario = await this.findOne(id);
        const updatedUsuario = Object.assign(usuario, updateUsuarioDto);
        return await this.usuarioRepository.save(updatedUsuario);
    }

    async remove(id: number) {
        await this.findOne(id);
        await this.usuarioRepository.delete(id);
        return { id };
    }

}
