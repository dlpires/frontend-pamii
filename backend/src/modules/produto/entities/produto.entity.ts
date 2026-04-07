import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ComandaItem } from '../../comanda-item/entities/comanda-item.entity';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  dsc_produto: string;

  @Column({ type: 'float' })
  valor_unit: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => ComandaItem, (comandaItem) => comandaItem.produto)
  comandaItens: ComandaItem[];
}
