import React from "react";

import { Typography } from "antd";

import TableProduct from "../components/TableOrder";
import TableOrder from "../components/TableProduct";

const Edit: React.FC = () => {
  const { Title } = Typography;

  return (
    <>
      <Title>Produtos e Pedidos</Title>
      <Title level={3}>Produtos</Title>
      <TableProduct />
      <Title level={3}>Pedidos</Title>
      <TableOrder />
    </>
  );
};

export default Edit;
