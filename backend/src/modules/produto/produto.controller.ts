import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ListProdutoDto } from './dto/list-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { DeleteProdutoDto } from './dto/delete-produto.dto';
import { IProdutoOutput } from './interfaces/produto.interface';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto): Promise<IProdutoOutput> {
    return await this.produtoService.create(createProdutoDto);
  }

  @Get()
  async findAll(@Query() listProdutoDto: ListProdutoDto): Promise<IProdutoOutput[]> {
    return await this.produtoService.findAll(listProdutoDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IProdutoOutput> {
    return await this.produtoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<IProdutoOutput> {
    return await this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteProdutoDto> {
    return await this.produtoService.remove(id);
  }
}
