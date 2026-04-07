import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { Produto } from './entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
