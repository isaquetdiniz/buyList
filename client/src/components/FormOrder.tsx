import React from "react";

import { Input, Form, Button, Space, Select } from "antd";

const FormOrder: React.FC = () => {
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
        name="formOrder"
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
