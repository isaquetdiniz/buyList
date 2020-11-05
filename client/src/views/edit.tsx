import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Button, Modal, Space } from "antd";

import TableProduct from "../components/TableOrder";
import TableOrder from "../components/TableProduct";

import FormProduct from "../components/FormProduct";
import FormOrder from "../components/FormOrder";
import { useAuth } from "../context/AuthContextProvider";

import { useHistory } from "react-router-dom";

const Edit: React.FC = () => {
  const [visibleNewOrder, setVisibleNewOrder] = useState(false);
  const [visibleNewProduct, setVisibleNewProduct] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducst] = useState([]);
  const { Title } = Typography;

  const setToken = useAuth()[1];
  const token = useAuth()[0];

  const history = useHistory();

  const instance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers: { "x-access-token": token },
  });

  const getProducts = () => {
    instance
      .get("/produto")
      .then((res) => {
        setProducst(res.data.produtos);
      })
      .catch();
  };

  const getOrders = () => {
    instance
      .get("/pedido")
      .then((res) => {
        setOrders(res.data.pedidos);
      })
      .catch();
  };

  const logout = () => {
    axios
      .post("http://localhost:3001/logout")
      .then((res) => {
        setToken(res.data.token);
        history.push("/login");
      })
      .catch(() =>
        Modal.error({ title: "Erro ao deslogar", content: "Tente novamente" })
      );
  };

  useEffect(() => {
    getProducts();
    getOrders();
  }, [visibleNewProduct, visibleNewOrder]);

  return (
    <Space align="center" direction="vertical">
      <Title>Produtos e Pedidos</Title>
      <Button type="primary" danger onClick={() => logout()}>
        Sair
      </Button>
      <Space direction="vertical" size="middle">
        <Title level={3}>Produtos</Title>
        <Button type="primary" onClick={() => setVisibleNewProduct(true)}>
          Adicionar Produto
        </Button>
        <TableOrder data={products} />
      </Space>
      <Space direction="vertical" size="middle">
        <Title level={3}>Pedidos</Title>
        <Button type="primary" onClick={() => setVisibleNewOrder(true)}>
          Adicionar Pedido
        </Button>
        <TableProduct data={orders} />
      </Space>
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
        <FormOrder data={products} />
      </Modal>
    </Space>
  );
};

export default Edit;
