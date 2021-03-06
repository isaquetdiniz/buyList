import React, { useEffect } from "react";
import axios from "axios";

import { Input, Form, Button, Space, Modal } from "antd";
import { useAuth } from "../context/AuthContextProvider";

interface Product {
  isEdit?: boolean;
  details?: {
    id: number;
    nome: string;
    categoria: string;
    descricao: string;
    precoUnitario: number;
  };
}

const FormProduct: React.FC<Product> = ({ isEdit, details }) => {
  const token = useAuth()[0];
  const setAttInformations = useAuth()[3];
  const [form] = Form.useForm();

  const onFinish = (values: Object) => {
    if (isEdit) {
      editProduct(values, details);
    } else {
      newProduct(values);
    }
  };

  const onFinishFailed = () => {
    console.log("Failed:");
  };

  const instance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers: { "x-access-token": token },
  });

  const newProduct = (values: Object) => {
    instance
      .post("/produto", values)
      .then(() => {
        Modal.success({ content: "Produto Cadastrado com sucesso!" });
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
        Modal.error({
          title: "Falha",
          content: "Um erro ocorreu ao tentar cadastrar o produto",
        });
      });
  };

  const editProduct = (values: Object, details: any) => {
    instance
      .put(`/produto/${details.id}`, values)
      .then(() => {
        Modal.success({ content: "Produto Editado com sucesso" });
        setAttInformations();
      })
      .catch(() =>
        Modal.error({ title: "Erro", content: "Erro ao editar produto" })
      );
  };

  useEffect(() => {
    if (isEdit && details) {
      form.setFieldsValue({
        id: details.id,
        nome: details.nome,
        categoria: details.categoria,
        descricao: details.descricao,
        precoUnitario: details.precoUnitario,
      });
    }
  }, [details]);

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
        form={form}
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
