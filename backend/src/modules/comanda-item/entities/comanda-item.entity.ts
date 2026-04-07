import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Comanda } from '../../comanda/entities/comanda.entity';
import { Produto } from '../../produto/entities/produto.entity';

@Entity('comandasItens')
export class ComandaItem {
  @PrimaryColumn()
  id_comanda: number;

  @PrimaryColumn()
  id_produto: number;

  @Column({ type: 'float' })
  qtd_item: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_venda: number;

  @Column({ type: 'boolean', default: false })
  statusPg: boolean;

  @Column({ type: 'boolean', default: false })
  statusEntrega: boolean;

  @ManyToOne(() => Comanda, (comanda) => comanda.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_comanda' })
  comanda: Comanda;

  @ManyToOne(() => Produto, (produto) => produto.comandaItens)
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;
}
