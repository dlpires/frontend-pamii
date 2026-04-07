import { Controller } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { ListMesaDto } from './dto/list-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { DeleteMesaDto } from './dto/delete-mesa.dto';
import { IMesaOutput } from './interfaces/mesa.interface';
import { Body, Get, Param, Patch, Post, Query, Delete } from '@nestjs/common';

@Controller('mesa')
export class MesaController {
    
  constructor(private readonly mesaService: MesaService) {}

  @Post()
  async create(@Body() createMesaDto: CreateMesaDto): Promise<IMesaOutput> {
    return await this.mesaService.create(createMesaDto);
  }

  @Get()
  async findAll(@Query() listMesaDto: ListMesaDto): Promise<IMesaOutput[]> {
    return await this.mesaService.findAll(listMesaDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IMesaOutput> {
    return await this.mesaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMesaDto: UpdateMesaDto,
  ): Promise<IMesaOutput> {
    return await this.mesaService.update(id, updateMesaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteMesaDto> {
    return await this.mesaService.remove(id);
  }

}
