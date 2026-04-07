import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mesa } from './entities/mesa.entity';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { ListMesaDto } from './dto/list-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { DeleteMesaDto } from './dto/delete-mesa.dto';
import { IMesaOutput } from './interfaces/mesa.interface';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MesaService {
    
  constructor(
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
  ) {}

  async create(createMesaDto: CreateMesaDto): Promise<IMesaOutput> {
    const mesa = this.mesaRepository.create(createMesaDto);
    return await this.mesaRepository.save(mesa);
  }

  async findAll(listMesaDto: ListMesaDto): Promise<IMesaOutput[]> {
    return await this.mesaRepository.find({
      where: listMesaDto,
    });
  }

  async findOne(id: number): Promise<IMesaOutput> {
    const mesa = await this.mesaRepository.findOne({ where: { id } });
    if (!mesa) {
      throw new NotFoundException(`Mesa com ID ${id} não encontrada`);
    }
    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto): Promise<IMesaOutput> {
    const mesa = await this.findOne(id);
    const updatedMesa = Object.assign(mesa, updateMesaDto);
    return await this.mesaRepository.save(updatedMesa);
  }

  async remove(id: number): Promise<DeleteMesaDto> {
    await this.findOne(id);
    await this.mesaRepository.delete(id);
    return { id };
  }

}
