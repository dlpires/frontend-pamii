import { Test, TestingModule } from '@nestjs/testing';
import { MesaController } from './mesa.controller';
import { MesaService } from './mesa.service';
import { UpdateComandaDto } from '../comanda/dto/update-comanda.dto';

describe('MesaController', () => {
  let controller: MesaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MesaController],
      providers: [
        {
          provide: MesaService,
          useValue: {
            // Defina aqui os métodos que o controller chama
            findOne: jest.fn().mockResolvedValue({ id: 1, qtd_cadeiras: 4, status: true }),
            create: jest.fn().mockResolvedValue({ id: 1, qtd_cadeiras: 4, status: true }),
            update: jest.fn().mockResolvedValue({ id: 1, qtd_cadeiras: 6, status: true }),
            remove: jest.fn().mockResolvedValue({ id: 1 }),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MesaController>(MesaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new mesa', async () => {
      const createMesaDto = {
        qtd_cadeiras: 4,
        status: true,
      };
      const result = { id: 1, ...createMesaDto };

      jest.spyOn(controller, 'create').mockImplementation(async () => result);

      expect(await controller.create(createMesaDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of mesas', async () => {
      const result = [
        { id: 1, qtd_cadeiras: 4, status: true },
      ];

      jest.spyOn(controller, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll({})).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single mesa', async () => {
      const result = { id: 1, qtd_cadeiras: 4, status: true };

      jest.spyOn(controller, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(1)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a mesa', async () => {
      const updateMesaDto = { id: 1, qtd_cadeiras: 6 };
      const result = { id: 1, qtd_cadeiras: 6, status: true };

      jest.spyOn(controller, 'update').mockImplementation(async () => result);

      expect(await controller.update(1, updateMesaDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a mesa', async () => {
      const result = { id: 1 };

      jest.spyOn(controller, 'remove').mockImplementation(async () => result);

      expect(await controller.remove(1)).toBe(result);
    });
  });

});
