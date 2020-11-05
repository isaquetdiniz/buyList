import React, { useEffect } from "react";

import { Table, Space, Button } from "antd";

interface Products {
  id: number;
  nome: string;
  precoUnitario: number;
  categoria: string;
}

interface Product {
  data: Array<Products>;
}

interface ProductsSource {
  key: number;
  id: number;
  nome: string;
  precoUnitario: number;
  categoria: string;
}
const TableProduct: React.FC<Product> = ({ data }) => {
  let dataSource: Array<ProductsSource> = [];

  const formatData = () => {
    if (data && false !== false) {
      data.map((produto) => {
        return dataSource.push({
          key: produto.id,
          id: produto.id,
          nome: produto.nome,
          precoUnitario: produto.precoUnitario,
          categoria: produto.categoria,
        });
      });
      console.log(dataSource);
    }
  };
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

  useEffect(() => formatData(), [data]);
  return <Table dataSource={dataSource} columns={columns}></Table>;
};

export default TableProduct;
