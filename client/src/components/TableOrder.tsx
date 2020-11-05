import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContextProvider";
import { Table, Space, Button, Modal } from "antd";

enum Produto {
  id,
  nome,
  descricao,
  precoUnitario,
  categoria,
}

interface Orders {
  id: string;
  produto: Produto.nome;
  quantidade: string;
  precoSomatorio: string;
}

interface Order {
  data: Array<Orders>;
}

interface OrdersSource {
  key: string;
  id: string;
  produto: Produto.nome;
  quantidade: string;
  precoSomatorio: string;
}

const TableOrder: React.FC<Order> = ({ data }) => {
  const [dataSource, setDataSource] = useState<Array<OrdersSource>>([]);

  const token = useAuth()[0];
  const setAttInformations = useAuth()[3];

  const instance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers: { "x-access-token": token },
  });

  const deleteProduct = (record: string) => {
    instance
      .delete(`/pedido/${record}`)
      .then(() => {
        Modal.success({ content: "Pedido deletado com sucesso" });
        setAttInformations();
      })
      .catch(() => {
        Modal.error({
          title: "Error",
          content: "Não foi possível apagar o pedido",
        });
      });
  };

  const formatData = () => {
    if (data !== []) {
      const arrayDataSource: Array<OrdersSource> = [];
      data.forEach((pedido) => {
        arrayDataSource.push({
          key: pedido.id,
          id: pedido.id,
          produto: pedido.produto,
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
      render: (text: string, record: Orders) => (
        <Space size="middle">
          <Button type="primary" onClick={() => {}}>
            Informações
          </Button>
          <Button onClick={() => {}}>Editar</Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              deleteProduct(record.id);
            }}
          >
            Deletar
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    formatData();
  }, [data]);

  return <Table dataSource={dataSource} columns={columns}></Table>;
};

export default TableOrder;
