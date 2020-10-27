import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createPedido1603804317977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pedidos",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "quantidade",
            type: "int",
          },
          {
            name: "preco-somatorio",
            type: "float",
          },
          {
            name: "produtoId",
            type: "int",
          },
        ],
      }),
      true
    );
    await queryRunner.createTable(
      new Table({
        name: "produtos",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "descricao",
            type: "varchar",
          },
          {
            name: "preco-unitario",
            type: "float",
          },
          {
            name: "categoria",
            type: "varchar",
          },
          {
            name: "pedidoId",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "pedidos",
      new TableForeignKey({
        columnNames: ["produtoId"],
        referencedColumnNames: ["id"],
        referencedTableName: "produtos",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "produtos",
      new TableForeignKey({
        columnNames: ["pedidoId"],
        referencedColumnNames: ["id"],
        referencedTableName: "pedidos",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const pedidos = await queryRunner.getTable("pedidos");
    const produtos = await queryRunner.getTable("produtos");
    const foreignKeyPedidos = pedidos.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("produtoId") !== -1
    );
    const foreignKeyProdutos = produtos.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("pedidoId") !== -1
    );
    await queryRunner.dropForeignKey("pedidos", foreignKeyPedidos);
    await queryRunner.dropForeignKey("produtos", foreignKeyProdutos);
    await queryRunner.dropTable("pedidos");
    await queryRunner.dropTable("produtos");
  }
}
