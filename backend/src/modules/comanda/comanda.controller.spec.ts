import { Test, TestingModule } from '@nestjs/testing';
import { ComandaController } from './comanda.controller';
import { ComandaService } from './comanda.service';
import { find } from 'rxjs';

describe('ComandaController', () => {
  let controller: ComandaController;
  let service: ComandaService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComandaController],
      providers: [
        {
          provide: ComandaService,
          useValue: {
            // Defina aqui os métodos que o controller chama
            findOne: jest.fn().mockResolvedValue({ id: 1, id_mesa: 1, ts_comanda: new Date() }),
            findOneByMesaId: jest.fn().mockResolvedValue({ id: 1, id_mesa: 1, ts_comanda: new Date() }),
            create: jest.fn().mockResolvedValue({ id: 1, id_mesa: 1, ts_comanda: new Date() }),
            update: jest.fn().mockResolvedValue({ id: 1, id_mesa: 1, ts_comanda: new Date() }),
            remove: jest.fn().mockResolvedValue({ id: 1 }),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ComandaController>(ComandaController);
    service = module.get<ComandaService>(ComandaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new comanda', async () => {
      const createDto = { id_mesa: 1, obs_comanda: 'Teste' };
      const result = { id: 1, ts_comanda: new Date(), ...createDto };
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(createDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of comandas', async () => {
      const result = [{ id: 1, id_mesa: 1, ts_comanda: new Date() }];
      const query = { id_mesa: 1 };
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll(query)).toBe(result);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should return a single comanda by id', async () => {
      const result = { id: 1, id_mesa: 1, ts_comanda: new Date() };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(1)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findOneByMesaId', () => {
    it('should return a comanda by mesa id', async () => {
      const result = { id: 1, id_mesa: 5, ts_comanda: new Date() };
      jest.spyOn(service, 'findOneByMesaId').mockImplementation(async () => result);

      expect(await controller.findOneByMesaId(5)).toBe(result);
      expect(service.findOneByMesaId).toHaveBeenCalledWith(5);
    });
  });

  describe('update', () => {
    it('should update a comanda', async () => {
      const updateDto = { id: 1, id_mesa: 1, obs_comanda: 'Teste'};
      const result = { ts_comanda: new Date(), ...updateDto };
      jest.spyOn(service, 'update').mockImplementation(async () => result);

      expect(await controller.update(1, updateDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a comanda', async () => {
      const result = { id: 1 };
      jest.spyOn(service, 'remove').mockImplementation(async () => result);

      expect(await controller.remove(1)).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
