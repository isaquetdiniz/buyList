import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContextProvider";
import { Table, Space, Button, Modal } from "antd";

import FormOrder from "./FormOrder";

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

interface Products {
  id: string;
  nome: string;
}

interface Order {
  data: Array<Orders>;
  dataProducts: Array<Products>;
}

interface OrdersSource {
  key: string;
  id: string;
  produto: Produto.nome;
  produtoId: Produto.id;
  quantidade: string;
  precoSomatorio: string;
}

const TableOrder: React.FC<Order> = ({ data, dataProducts }) => {
  const [dataSource, setDataSource] = useState<Array<OrdersSource>>([]);
  const [visibleEditOrder, setVisibleEditOrder] = useState<boolean>();
  const [details, setDetails] = useState<Orders>();

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
      data.forEach((pedido: any) => {
        arrayDataSource.push({
          key: pedido.id,
          id: pedido.id,
          produto: pedido.produto.nome,
          produtoId: pedido.produto.id,
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
          <Button
            onClick={() => {
              setVisibleEditOrder(true);
              console.log(record);
              setDetails(record);
            }}
          >
            Editar
          </Button>
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

  return (
    <>
      <Table dataSource={dataSource} columns={columns}></Table>
      <Modal
        title="Editar Produto"
        visible={visibleEditOrder}
        onCancel={() => {
          setVisibleEditOrder(false);
        }}
        footer={null}
      >
        <FormOrder isEdit details={details} data={dataProducts} />
      </Modal>
    </>
  );
};

export default TableOrder;
