import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComandaItem } from './entities/comanda-item.entity';
import { CreateComandaItemDto } from './dto/create-comanda-item.dto';
import { ListComandaItemDto } from './dto/list-comanda-item.dto';
import { UpdateComandaItemDto } from './dto/update-comanda-item.dto';
import { DeleteComandaItemDto } from './dto/delete-comanda-item.dto';
import { IComandaItemOutput } from './interfaces/comanda-item.interface';

@Injectable()
export class ComandaItemService {
  constructor(
    @InjectRepository(ComandaItem)
    private readonly comandaItemRepository: Repository<ComandaItem>,
  ) {}

  async create(createComandaItemDto: CreateComandaItemDto): Promise<IComandaItemOutput> {
    const comandaItem = this.comandaItemRepository.create(createComandaItemDto);
    return await this.comandaItemRepository.save(comandaItem);
  }

  async findAll(listComandaItemDto: ListComandaItemDto): Promise<IComandaItemOutput[]> {
    return await this.comandaItemRepository.find({
      where: listComandaItemDto,
    });
  }

  async findOne(id_comanda: number, id_produto: number): Promise<IComandaItemOutput> {
    const comandaItem = await this.comandaItemRepository.findOne({ where: { id_comanda, id_produto } });
    if (!comandaItem) {
      throw new NotFoundException(`Item da comanda ${id_comanda} e produto ${id_produto} não encontrado`);
    }
    return comandaItem;
  }

  async update(id_comanda: number, id_produto: number, updateComandaItemDto: UpdateComandaItemDto): Promise<IComandaItemOutput> {
    const comandaItem = await this.findOne(id_comanda, id_produto);
    const updatedComandaItem = Object.assign(comandaItem, updateComandaItemDto);
    return await this.comandaItemRepository.save(updatedComandaItem);
  }

  async remove(id_comanda: number, id_produto: number): Promise<DeleteComandaItemDto> {
    await this.findOne(id_comanda, id_produto);
    await this.comandaItemRepository.delete({ id_comanda, id_produto });
    return { id_comanda, id_produto };
  }
}