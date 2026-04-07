import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MesaController } from './mesa.controller';
import { MesaService } from './mesa.service';
import { Mesa } from './entities/mesa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mesa])],
  controllers: [MesaController],
  providers: [MesaService],
  exports: [MesaService],
})
export class MesaModule {}
