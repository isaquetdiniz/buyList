import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Pedido } from "./Pedidos";

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  nome: string;

  @Column({ type: "varchar" })
  descricao: string;

  @Column({ type: "double precision" })
  precoUnitario: number;

  @Column({ type: "varchar" })
  categoria: string;

  @OneToOne(() => Pedido)
  @JoinColumn()
  pedido: Pedido;
}
