import React from "react";

import { Table, Space, Button } from "antd";

const TableOrder: React.FC = () => {
  const dataSource = [
    {
      key: "1",
      id: 1,
      produto: "Tomate",
      quantidade: 10,
      precoSomatorio: 47.9,
    },
  ];
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Produto", dataIndex: "produto", key: "produto" },
    { title: "Quantidade", dataIndex: "quantidade", key: "quantidade" },
    {
      title: "Preço Somatório",
      dataIndex: "precoSomatorio",
      key: "precoSomatorio",
    },
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
          <Button type="primary" onClick={() => {}}>
            Deletar
          </Button>
        </Space>
      ),
    },
  ];
  return <Table dataSource={dataSource} columns={columns}></Table>;
};

export default TableOrder;
