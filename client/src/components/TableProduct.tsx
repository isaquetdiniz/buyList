import React, { useEffect, useState } from "react";

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
  const [dataSource, setDataSource] = useState<Array<ProductsSource>>([]);

  const formatData = () => {
    if (data !== []) {
      const arrayProducts: Array<ProductsSource> = [];
      data.forEach((produto) => {
        arrayProducts.push({
          key: produto.id,
          id: produto.id,
          nome: produto.nome,
          precoUnitario: produto.precoUnitario,
          categoria: produto.categoria,
        });
      });
      setDataSource(arrayProducts);
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
