# Plano de Implementação: Autenticação com JWT

## Visão Geral

Este plano detalha a implementação de autenticação usando JWT (JSON Web Tokens) para substituir o sistema de login hardcoded atual no frontend pela integração com o backend e o banco de dados de usuários.

## Arquitetura Atual vs Nova

### Arquitetura Atual
- Frontend: Login hardcoded com usuário/senha "admin/admin"
- Backend: Endpoint `/usuario/login` existente mas com problemas
- Segurança: Nenhuma autenticação real, senhas armazenadas com criptografia reversível
- Rotas: Todas acessíveis sem autenticação

### Arquitetura Nova
- Frontend: Chamada à API de autenticação com credenciais reais
- Backend: Novo módulo de autenticação com JWT tokens
- Segurança: Tokens JWT para sessões, senhas armazenadas com criptografia reversível (manter compatibilidade)
- Rotas: Proteção via guards de autenticação

## Etapas de Implementação

### 1. Backend: Instalar Dependências JWT

```bash
cd backend
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt
```

### 2. Backend: Criar Módulo de Autenticação

Criar estrutura de diretórios:
```
backend/src/modules/auth/
├── auth.module.ts
├── auth.controller.ts
├── auth.service.ts
├── jwt.strategy.ts
├── jwt-auth.guard.ts
└── dto/
    └── login.dto.ts
```

**auth.module.ts**
```typescript
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

**auth.controller.ts**
```typescript
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.usuario, loginDto.senha);
  }
}
```

**auth.service.ts**
```typescript
import { Injectable } from '@nestjs/common';
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
    
    // Remover senha do payload do token
    const { senha: _, ...userWithoutPassword } = user;
    
    const payload = { 
      sub: user.id, 
      usuario: user.usuario,
      nome: user.nome,
      perfil: user.perfil
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}
```

**jwt.strategy.ts**
```typescript
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret_key',
    });
  }

  async validate(payload: any) {
    return { 
      id: payload.sub, 
      usuario: payload.usuario,
      nome: payload.nome,
      perfil: payload.perfil
    };
  }
}
```

**jwt-auth.guard.ts**
```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

**dto/login.dto.ts**
```typescript
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  usuario: string;

  @IsNotEmpty()
  @IsString()
  senha: string;
}
```

### 3. Backend: Atualizar App Module

Adicionar `AuthModule` ao `app.module.ts`:

```typescript
// Import
import { AuthModule } from './modules/auth/auth.module';

// No array de imports
AuthModule,
```

### 4. Backend: Corrigir Usuario Controller

Atualizar método login em `usuario.controller.ts`:

```typescript
import { IUsuarioLoginInput } from './interfaces/usuario.interface';

@Post('login')
async login(@Body() loginDto: IUsuarioLoginInput): Promise<IUsuarioOutput> {
  return await this.usuarioService.login(loginDto.usuario, loginDto.senha);
}
```

### 5. Frontend: Criar Camada de API

Criar `frontend/src/shared/api.js`:

```javascript
const API_BASE = 'http://localhost:3001';

export const api = {
  async post(path, body) {
    const response = await fetch(API_BASE + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }
    
    return response.json();
  },
  
  async get(path) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_BASE + path, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }
    
    return response.json();
  }
};
```

### 6. Frontend: Criar Auth Utilities

Criar `frontend/src/shared/auth.js`:

```javascript
export function login(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
```

### 7. Frontend: Atualizar Login Page

Modificar `frontend/src/pages/login/LoginPage.js`:

```javascript
import './LoginPage.css'
import { createHeader } from '../../shared/Header.js'
import { api } from '../../shared/api.js'
import { login } from '../../shared/auth.js'

const pageName = 'Login';

class LoginPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <div class="container">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>Acessar</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-item>
                            <ion-icon slot="start"name="person">
                            </ion-icon>
                            <ion-input type="text" id="usuario"
                            placeholder="Usuário"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon slot="start" name="lock-closed">
                            </ion-icon>
                            <ion-input type="password" id="senha"
                            placeholder="Senha"></ion-input>
                        </ion-item>

                        <ion-button expand="block" id="login" class="ion-margin-top">
                            Entrar
                        </ion-button>
                    </ion-card-content>
                </ion-card>
            </div>
        `;

        // Referencias
        const userInput = this.querySelector('#usuario');
        const passInput = this.querySelector('#senha');
        const btnLogin = this.querySelector('#login');

        btnLogin.addEventListener('click', async () => {
            const usuario = userInput.value;
            const senha = passInput.value;

            const loading = document.createElement('ion-loading');
            loading.message = 'Autenticando...';
            loading.duration = 3000;

            document.body.appendChild(loading);
            await loading.present();
            await loading.onDidDismiss(); // Aguardar o tempo do loading

            try {
                const response = await api.post('/auth/login', { usuario, senha });
                login(response.access_token, response.user);
                toast('Login realizado com sucesso!', 'success');
                document.querySelector('ion-router').push('/home', 'forward');
            } catch (error) {
                toast('Usuário ou senha incorretos!');
            }
        })

        async function toast(mensagem, color = 'danger') {
            const toast = document.createElement('ion-toast');
            toast.message = mensagem;
            toast.color = color;
            toast.duration = 2000;
            toast.position = 'bottom';

            document.body.appendChild(toast);
            return toast.present();
        }
    }
}

customElements.define('login-page', LoginPage);
```

### 8. Frontend: Atualizar Util.js

Atualizar `frontend/src/shared/util.js`:

```javascript
import { logout as authLogout } from './auth.js';

export function logout() {
    authLogout();
    const login_url = document.querySelector('ion-router')?.useHash ?? true;
    window.location.href = login_url == true ? '#/login' : '/login';
}
```

### 9. Frontend: Adicionar Route Guards

Adicionar verificação em cada página protegida (HomePage, ListUsuarioPage, etc.) no início do `connectedCallback()`:

```javascript
import { isAuthenticated } from '../../shared/auth.js';

// No início do connectedCallback de cada página protegida:
if (!isAuthenticated()) {
    document.querySelector('ion-router').push('/login', 'root');
    return;
}
```

### 10. Testar

1. Iniciar backend: `cd backend && npm run start:dev`
2. Iniciar frontend: `cd frontend && npm run dev`
3. Acessar http://localhost:5173
4. Fazer login com usuário cadastrado no banco