import React from 'react';
import axios from 'axios';

import {
  Typography, Input, Form, Button, Space, Modal,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Login: React.FC = () => {
  const { Title } = Typography;

  const login = (values: object) => {
    axios
      .post('http://localhost:3001/login', values)
      .then(() => console.log('foi'))
      .catch(() => Modal.error({
        title: 'Falha no Login ',
        content: 'Usuário ou senha inválidos',
      }));
  };

  const onFinish = (values: object) => {
    login(values);
  };

  const onFinishFailed = () => {
    console.log('Failed:');
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
      <Title>Tela de Login</Title>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Usuário/Email"
          name="name"
          rules={[{ required: true, message: 'Insira seu usuário!' }]}
        >
          <Input placeholder="Usuário/Email" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: 'Insira sua senha' }]}
        >
          <Input.Password placeholder="Senha" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Login;
