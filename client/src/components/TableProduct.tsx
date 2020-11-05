import React from "react";

import { Table, Space, Button } from "antd";

interface Product {
  data: object[];
}
const TableProduct: React.FC<Product> = ({ data }) => {
  const dataSource = [
    {
      key: "1",
      id: 1,
      nome: "Tomate",
      precoUnitario: 4.79,
      categoria: "Verduras",
    },
  ];
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "Preço", dataIndex: "precoUnitario", key: "precoUnitario" },
    { title: "Categoria", dataIndex: "categoria", key: "categoria" },
    {
      title: "Opções",
      dataIndex: "opcoes",
      key: "opcoes",
      render: (text: string, record: object) => (
        <Space size="middle">
          <Button type="primary" onClick={() => {}}>
            Informações
          </Button>
          <Button onClick={() => {}}>Editar</Button>
          <Button type="primary" danger onClick={() => {}}>
            Deletar
          </Button>
        </Space>
      ),
    },
  ];
  return <Table dataSource={dataSource} columns={columns}></Table>;
};

export default TableProduct;
