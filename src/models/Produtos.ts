import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Produtos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar" })
  nome: string;

  @Column({ type: "varchar" })
  descricao: string;

  @Column({ type: "double precision" })
  precoUnitario: number;

  @Column({ type: "varchar" })
  categoria: string;
}
