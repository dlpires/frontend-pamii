import { Controller } from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { ListComandaDto } from './dto/list-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { DeleteComandaDto } from './dto/delete-comanda.dto';
import { IComandaOutput } from './interfaces/comanda.interface';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('comanda')
export class ComandaController {
    
  constructor(private readonly comandaService: ComandaService) {}

  @Post()
  async create(@Body() createComandaDto: CreateComandaDto): Promise<IComandaOutput> {
    return await this.comandaService.create(createComandaDto);
  }

  @Get()
  async findAll(@Query() listComandaDto: ListComandaDto): Promise<IComandaOutput[]> {
    return await this.comandaService.findAll(listComandaDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IComandaOutput> {
    return await this.comandaService.findOne(id);
  }

  @Get('mesa/:id_mesa')
  async findOneByMesaId(@Param('id_mesa') id_mesa: number): Promise<IComandaOutput> {
    return await this.comandaService.findOneByMesaId(id_mesa);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateComandaDto: UpdateComandaDto,
  ): Promise<IComandaOutput> {
    return await this.comandaService.update(id, updateComandaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteComandaDto> {
    return await this.comandaService.remove(id);
  }

}
