import React from "react";

import { Input, Form, Button, Space } from "antd";

const FormProduct: React.FC = () => {
  const onFinish = () => {
    console.log("Success:");
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
        name="formProduct"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Insira o nome" }]}
        >
          <Input placeholder="Nome" />
        </Form.Item>
        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[{ required: true, message: "Insira a descricao" }]}
        >
          <Input.TextArea placeholder="Descrição" />
        </Form.Item>
        <Form.Item
          label="Categoria"
          name="categoria"
          rules={[{ required: true, message: "Insira a categoria" }]}
        >
          <Input placeholder="Categoria" />
        </Form.Item>
        <Form.Item
          label="Preço"
          name="precoUnitario"
          rules={[{ required: true, message: "Insira o preço" }]}
        >
          <Input placeholder="Preço" />
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

export default FormProduct;
