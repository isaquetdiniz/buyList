import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Produtos } from "./Produtos";

@Entity()
export class Pedidos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  quantidade: number;

  @Column({ type: "int" })
  precoSomatorio: number;

  @OneToOne(() => Produtos)
  @JoinColumn()
  produto: Produtos;
}
