import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ComandaItemService } from './comanda-item.service';
import { CreateComandaItemDto } from './dto/create-comanda-item.dto';
import { ListComandaItemDto } from './dto/list-comanda-item.dto';
import { UpdateComandaItemDto } from './dto/update-comanda-item.dto';
import { DeleteComandaItemDto } from './dto/delete-comanda-item.dto';
import { IComandaItemOutput } from './interfaces/comanda-item.interface';

@Controller('comanda-item')
export class ComandaItemController {
  constructor(private readonly comandaItemService: ComandaItemService) {}

  @Post()
  async create(@Body() createComandaItemDto: CreateComandaItemDto): Promise<IComandaItemOutput> {
    return await this.comandaItemService.create(createComandaItemDto);
  }

  @Get()
  async findAll(@Query() listComandaItemDto: ListComandaItemDto): Promise<IComandaItemOutput[]> {
    return await this.comandaItemService.findAll(listComandaItemDto);
  }

  @Get(':id_comanda/:id_produto')
  async findOne(@Param('id_comanda') id_comanda: number, @Param('id_produto') id_produto: number): Promise<IComandaItemOutput> {
    return await this.comandaItemService.findOne(id_comanda, id_produto);
  }

  @Get(':id_comanda')
  async findByComanda(@Param('id_comanda') id_comanda: number) {
    return await this.comandaItemService.findAll({ id_comanda });
  }

  @Get('status-pg/:id_comanda')
  async findByComandaPaga(@Param('id_comanda') id_comanda: number, @Param('statusPg') statusPg: boolean): Promise<IComandaItemOutput[]> {
    return await this.comandaItemService.findAll({ id_comanda, statusPg: true });
  }

  @Get('status-entrega/:id_comanda')
  async findByComandaEntrega(@Param('id_comanda') id_comanda: number, @Param('statusEntrega') statusEntrega: boolean): Promise<IComandaItemOutput[]> {
    return await this.comandaItemService.findAll({ id_comanda, statusEntrega: true });
  }

  @Patch(':id_comanda/:id_produto')
  async update(
    @Param('id_comanda') id_comanda: number,
    @Param('id_produto') id_produto: number,
    @Body() updateComandaItemDto: UpdateComandaItemDto,
  ): Promise<IComandaItemOutput> {
    return await this.comandaItemService.update(id_comanda, id_produto, updateComandaItemDto);
  }

  @Delete(':id_comanda/:id_produto')
  async remove(@Param('id_comanda') id_comanda: number, @Param('id_produto') id_produto: number): Promise<DeleteComandaItemDto> {
    return await this.comandaItemService.remove(id_comanda, id_produto);
  }
}