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
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "quantidade",
            type: "int",
          },
          {
            name: "precoSomatorio",
            type: "float",
          },
          {
            name: "produtoId",
            type: "int",
            isNullable: true,
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
            type: "integer",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment",
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
            name: "precoUnitario",
            type: "float",
          },
          {
            name: "categoria",
            type: "varchar",
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const pedidos = await queryRunner.getTable("pedidos");
    const foreignKeyPedidos = pedidos.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("produtoId") !== -1
    );
    await queryRunner.dropForeignKey("pedidos", foreignKeyPedidos);
    await queryRunner.dropTable("pedidos");
    await queryRunner.dropTable("produtos");
  }
}
