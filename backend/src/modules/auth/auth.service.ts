import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(usuario: string, senha: string) {
    const user = await this.usuarioService.login(usuario, senha);

    const { senha: _, ...userWithoutPassword } = user;

    const payload = {
      sub: user.id,
      usuario: user.usuario,
      nome: user.nome,
      perfil: user.perfil,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}
