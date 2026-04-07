import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mesas')
export class Mesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  qtd_cadeiras: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}