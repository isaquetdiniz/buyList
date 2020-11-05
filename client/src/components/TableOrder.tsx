import React, { useEffect, useState } from "react";

import { Table, Space, Button } from "antd";

interface Produto {
  nome: string;
}

interface Orders {
  id: string;
  produto: Produto;
  quantidade: string;
  precoSomatorio: string;
}
interface Order {
  data: Array<Orders>;
}

interface OrdersSource {
  key: string;
  id: string;
  produto: string;
  quantidade: string;
  precoSomatorio: string;
}
const TableOrder: React.FC<Order> = ({ data }) => {
  const [dataSource, setDataSource] = useState<Array<OrdersSource>>([]);

  const formatData = () => {
    if (data !== []) {
      const arrayDataSource: Array<OrdersSource> = [];
      data.forEach((pedido) => {
        arrayDataSource.push({
          key: pedido.id,
          id: pedido.id,
          produto: pedido.produto.nome,
          quantidade: pedido.quantidade,
          precoSomatorio: pedido.precoSomatorio,
        });
      });
      setDataSource(arrayDataSource);
    }
  };

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
          <Button type="primary" danger onClick={() => {}}>
            Deletar
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    formatData();
    console.log(data);
  }, [data]);

  return <Table dataSource={dataSource} columns={columns}></Table>;
};

export default TableOrder;
