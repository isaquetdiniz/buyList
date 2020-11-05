import React, { useEffect, useState } from "react";
import axios from "axios";

import { Input, Form, Button, Space, Select, Modal } from "antd";
import { useAuth } from "../context/AuthContextProvider";

interface Produto {
  id: string;
  nome: string;
}
interface Order {
  data?: Array<Produto>;
}
const FormOrder: React.FC<Order> = ({ data }) => {
  const [form] = Form.useForm();
  const token = useAuth()[0];

  const instance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers: { "x-access-token": token },
  });

  const newOrder = (values: Object) => {
    instance
      .post("/pedido", values)
      .then(() => {
        Modal.success({ content: "Pedido Cadastrado!" });
        form.resetFields();
      })
      .catch((err) => {
        Modal.error({ title: "Erro", content: "Erro ao cadastrar o pedido" });
      });
  };

  const onFinish = (values: Object) => {
    newOrder(values);
  };

  const onFinishFailed = () => {
    console.log("Failed:");
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Space direction="vertical" align="center">
      <Form
        {...layout}
        name="formOrder"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Produto"
          name="produtoId"
          rules={[{ required: true, message: "Insira o produto" }]}
        >
          <Select>
            {data
              ? data.map((produto) => {
                  return (
                    <Select.Option value={produto.id}>
                      {produto.nome}
                    </Select.Option>
                  );
                })
              : ""}
            <Select.Option value={1}>Tomate</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Quantidade"
          name="quantidade"
          rules={[{ required: true, message: "Insira o preço" }]}
        >
          <Input placeholder="Quantidade" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default FormOrder;
