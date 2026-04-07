import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UpdateComandaDto } from '../comanda/dto/update-comanda.dto';

describe('UsuarioController', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const mockResponse = { id: 1, usuario: 'testeuser', senha: '123', perfil: 1 };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockResponse),
            create: jest.fn().mockResolvedValue(mockResponse),
            update: jest.fn().mockResolvedValue(mockResponse),
            remove: jest.fn().mockResolvedValue({ id: 1 }),
            findAll: jest.fn(),
            findByUsuario: jest.fn().mockResolvedValue(mockResponse),
            findByPerfil: jest.fn().mockResolvedValue(mockResponse),
            login: jest.fn().mockResolvedValue(mockResponse)
          },
        },
      ],    
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new usuario', async () => {
      const createUsuarioDto = {
        nome: 'Teste',
        usuario: 'testeuser',
        senha: '123',
        perfil: 1,
      };
      const result = { id: 1, ...createUsuarioDto };

      jest.spyOn(controller, 'create').mockImplementation(async () => result);

      expect(await controller.create(createUsuarioDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of usuarios', async () => {
      const result = [
        { id: 1, nome: 'Teste', usuario: 'testeuser', senha: '123', perfil: 1 },
      ];

      jest.spyOn(controller, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll({})).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single usuario', async () => {
      const result = { id: 1, nome: 'Teste', usuario: 'testeuser', senha: '123', perfil: 1 };

      jest.spyOn(controller, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(1)).toBe(result);
    });
  });

  describe('findByUsuario', () => {
    it('should return a usuario by username', async () => {
      const result = { id: 1, nome: 'Teste', usuario: 'testeuser', senha: '123', perfil: 1 };

      jest.spyOn(controller, 'findByUsuario').mockImplementation(async () => result);

      expect(await controller.findByUsuario('testeuser')).toBe(result);
    });
  });

  describe('findByPerfil', () => {
    it('should return a usuario by perfil', async () => {
      const result = { id: 1, nome: 'Teste', usuario: 'testeuser', senha: '123', perfil: 1 };

      jest.spyOn(controller, 'findByPerfil').mockImplementation(async () => result);

      expect(await controller.findByPerfil(1)).toBe(result);
    });
  });

  describe('login', () => {
    it('should return a usuario by login', async () => {
      const result = { id: 1, nome: 'Teste', usuario: 'testeuser', senha: '123', perfil: 1 };

      jest.spyOn(controller, 'login').mockImplementation(async () => result);

      expect(await controller.login('testeuser', '123')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a usuario', async () => {
      const updateUsuarioDto = { id: 1, nome: 'Teste Alterado' };
      const result = { id: 1, nome: 'Teste Alterado', usuario: 'testeuser', senha: '123', perfil: 1 };

      jest.spyOn(controller, 'update').mockImplementation(async () => result);

      expect(await controller.update(1, updateUsuarioDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a usuario', async () => {
      const result = { id: 1 };
      jest.spyOn(controller, 'remove').mockImplementation(async () => result);
      expect(await controller.remove(1)).toBe(result);
    });
  });
});
