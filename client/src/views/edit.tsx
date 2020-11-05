import React, { useState } from "react";

import { Typography, Button, Modal } from "antd";

import TableProduct from "../components/TableOrder";
import TableOrder from "../components/TableProduct";

import FormProduct from "../components/FormProduct";
import FormOrder from "../components/FormOrder";

const Edit: React.FC = () => {
  const [visibleNewOrder, setVisibleNewOrder] = useState(false);
  const [visibleNewProduct, setVisibleNewProduct] = useState(false);
  const { Title } = Typography;

  return (
    <>
      <Title>Produtos e Pedidos</Title>
      <Title level={3}>Produtos</Title>
      <Button type="primary" onClick={() => setVisibleNewProduct(true)}>
        Adicionar Produto
      </Button>
      <TableOrder />
      <Title level={3}>Pedidos</Title>
      <Button type="primary" onClick={() => setVisibleNewOrder(true)}>
        Adicionar Pedido
      </Button>
      <TableProduct />
      <Modal
        title="Cadastrar Novo Produto"
        visible={visibleNewProduct}
        onCancel={() => {
          setVisibleNewProduct(false);
        }}
        footer={null}
      >
        <FormProduct />
      </Modal>
      <Modal
        title="Cadastrar Novo Pedido"
        visible={visibleNewOrder}
        onCancel={() => {
          setVisibleNewOrder(false);
        }}
        footer={null}
      >
        <FormOrder />
      </Modal>
    </>
  );
};

export default Edit;
