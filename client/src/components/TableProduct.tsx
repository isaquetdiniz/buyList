import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContextProvider";
import { Table, Space, Button, Modal } from "antd";

import FormProduct from "./FormProduct";

interface Products {
  id: number;
  nome: string;
  precoUnitario: number;
  categoria: string;
  descricao: string;
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
  descricao: string;
}

const TableProduct: React.FC<Product> = ({ data }) => {
  const [dataSource, setDataSource] = useState<Array<ProductsSource>>([]);
  const [isVisileEditProduct, setIsVisibleEditProduct] = useState<boolean>();
  const [details, setDetails] = useState<Products>();

  const token = useAuth()[0];
  const setAttInformations = useAuth()[3];

  const instance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers: { "x-access-token": token },
  });

  const deleteProduct = (record: number) => {
    instance
      .delete(`/produto/${record}`)
      .then((res) => {
        console.log(res);
        Modal.success({ content: "Produto excluído com sucesso" });
        setAttInformations();
      })
      .catch(() =>
        Modal.error({
          title: "Erro",
          content: "Não não possível excluir o produto",
        })
      );
  };

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
          descricao: produto.descricao,
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
      render: (text: string, record: Products) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              Modal.info({
                title: "Mais informações",
                content: `Descrição: ${record.descricao}`,
              });
            }}
          >
            Informações
          </Button>
          <Button
            onClick={() => {
              setIsVisibleEditProduct(true);
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

  useEffect(() => formatData(), [data]);
  return (
    <>
      <Table dataSource={dataSource} columns={columns}></Table>
      <Modal
        title="Editar Produto"
        visible={isVisileEditProduct}
        onCancel={() => {
          setIsVisibleEditProduct(false);
        }}
        footer={null}
      >
        <FormProduct isEdit details={details} />
      </Modal>
    </>
  );
};

export default TableProduct;
