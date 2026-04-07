import { Test, TestingModule } from '@nestjs/testing';
import { ComandaItemController } from './comanda-item.controller';
import { ComandaItemService } from './comanda-item.service';

describe('ComandaItemController', () => {
  let controller: ComandaItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComandaItemController],
      providers: [
        {
          provide: ComandaItemService,
          useValue: {
            // Defina aqui os métodos que o controller chama
            findOne: jest.fn().mockResolvedValue({ id_comanda: 1, id_produto: 1, qtd_item: 2, valor_venda: 10.5, statusPg: false, statusEntrega: false }),
            create: jest.fn().mockResolvedValue({ id_comanda: 1, id_produto: 1, qtd_item: 2, valor_venda: 10.5, statusPg: false, statusEntrega: false }),
            update: jest.fn().mockResolvedValue({ id_comanda: 1, id_produto: 1, qtd_item: 2, valor_venda: 10.5, statusPg: false, statusEntrega: false }),
            remove: jest.fn().mockResolvedValue({ id_comanda: 1, id_produto: 1, qtd_item: 2, valor_venda: 10.5, statusPg: false, statusEntrega: false }),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ComandaItemController>(ComandaItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a comanda item', async () => {
      const dto = { id_comanda: 1, id_produto: 1, qtd_item: 2, valor_venda: 10.5 };
      const result = { ...dto, statusPg: false, statusEntrega: false };
      jest.spyOn(controller['comandaItemService'], 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of comanda items', async () => {
      const result = [{ id_comanda: 1, id_produto: 1, qtd_item: 2, valor_venda: 10.5, statusPg: false, statusEntrega: false }];
      jest.spyOn(controller['comandaItemService'], 'findAll').mockResolvedValue(result);

      expect(await controller.findAll({})).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single comanda item', async () => {
      const result = { id_comanda: 1, id_produto: 1, qtd_item: 2, valor_venda: 10.5, statusPg: false, statusEntrega: false };
      jest.spyOn(controller['comandaItemService'], 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1, 1)).toBe(result);
    });
  });

  describe('findByComanda', () => {
    it('should return items for a specific comanda', async () => {
      const result = [{ id_comanda: 1, id_produto: 1, qtd_item: 2, valor_venda: 10.5, statusPg: false, statusEntrega: false }];
      jest.spyOn(controller['comandaItemService'], 'findAll').mockResolvedValue(result);

      expect(await controller.findByComanda(1)).toBe(result);
    });
  });
});
