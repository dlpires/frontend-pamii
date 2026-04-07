import { Module } from '@nestjs/common';
import { ComandaController } from './comanda.controller';
import { ComandaService } from './comanda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comanda } from './entities/comanda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comanda])],
  controllers: [ComandaController],
  providers: [ComandaService],
  exports: [ComandaService],
})
export class ComandaModule {}
