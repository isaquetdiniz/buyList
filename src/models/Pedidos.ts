import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Produto } from "./Produtos";

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  quantidade: number;

  @Column({ type: "int" })
  precoSomatorio: number;

  @OneToOne(() => Produto)
  @JoinColumn()
  produto: Produto;
}
