import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionTransformer } from '../../../common/encryption/encryption.transformer';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  usuario: string;

  @Column({
    type: 'text',
    transformer: new EncryptionTransformer()
  })
  senha: string;

  @Column({ default: 0 })
  perfil: number;
}