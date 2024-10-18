import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { login, register } from '../../services/user.services';
import { useAppDispatch } from '../../hook/hooks';
import { loginRedux } from '../../redux/userSlice';

const Login = ({ handleOk }: { handleOk: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: { user_name: string; password: string }) => {
    const { user_name, password } = values;
    if (isLogin) {
      setIsLoading(true);
      login({ user_name, password })
        .then(() => {
          localStorage.setItem('user_name', user_name);
          handleOk();
          dispatch(loginRedux(user_name));
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      register({ user_name, password })
        .then(() => {
          localStorage.setItem('user_name', user_name);
          handleOk();
          dispatch(loginRedux(user_name));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Form
      name="auth"
      style={{
        maxWidth: '100%',
      }}
      onFinish={onFinish}
    >
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <Form.Item
        name="user_name"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} block type="primary" htmlType="submit">
          {isLogin ? 'Log in' : 'Sign Up'}
        </Button>
        or{' '}
        <a
          href="#"
          onClick={() => {
            setIsLogin(false);
          }}
        >
          Register now!
        </a>
      </Form.Item>
    </Form>
  );
};

export default Login;
