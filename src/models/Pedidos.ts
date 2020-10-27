import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  quantidade: number;

  @Column({ type: "int" })
  precoSomatorio: number;

  @Column({ type: "int" })
  produtoId: number;
}
