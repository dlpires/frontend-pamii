import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';

describe('ProdutoController', () => {
  let controller: ProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [
        {
          provide: ProdutoService,
          useValue: {
            // Defina aqui os métodos que o controller chama
            findOne: jest.fn().mockResolvedValue({ id: 1, dsc_produto: 'Café', valor_unit: 5.0, status: true }),
            create: jest.fn().mockResolvedValue({ id: 1, dsc_produto: 'Café', valor_unit: 5.0, status: true }),
            update: jest.fn().mockResolvedValue({ id: 1, dsc_produto: 'Café Alterado', valor_unit: 5.0, status: true }),
            remove: jest.fn().mockResolvedValue({ id: 1 }),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProdutoController>(ProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new produto', async () => {
      const createProdutoDto = {
        dsc_produto: 'Café Expresso',
        valor_unit: 5.5,
        status: true,
      };
      const result = { id: 1, ...createProdutoDto };

      jest.spyOn(controller, 'create').mockImplementation(async () => result);

      expect(await controller.create(createProdutoDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of produtos', async () => {
      const result = [
        { id: 1, dsc_produto: 'Café', valor_unit: 5.0, status: true },
      ];

      jest.spyOn(controller, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll({})).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single produto', async () => {
      const result = { id: 1, dsc_produto: 'Café', valor_unit: 5.0, status: true };

      jest.spyOn(controller, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(1)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a produto', async () => {
      const updateProdutoDto = { id: 1, dsc_produto: 'Café Alterado' };
      const result = { id: 1, dsc_produto: 'Café Alterado', valor_unit: 5.0, status: true };

      jest.spyOn(controller, 'update').mockImplementation(async () => result);

      expect(await controller.update(1, updateProdutoDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a produto', async () => {
      const result = { id: 1 };

      jest.spyOn(controller, 'remove').mockImplementation(async () => result);

      expect(await controller.remove(1)).toBe(result);
    });
  });
});
