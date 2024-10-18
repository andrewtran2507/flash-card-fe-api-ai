import './App.css';
import type { MenuProps } from 'antd';
import { Avatar, Button, Layout, Menu, theme } from 'antd';
// eslint-disable-next-line no-unused-vars
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Landing from './components/landing/landing';
import { Modal } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined } from '@ant-design/icons';
import Login from './components/login/login';
import DashBoard from './pages/DashBoard/dashboard';
import Learning from './pages/Learning/learning';
import './App.css';
import { isNil } from 'lodash';
import { useAppDispatch, useAppSelector } from './hook/hooks';
import { logoutRedux } from './redux/userSlice';

const App = () => {
  const { Header, Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useAppDispatch();
  const userNameRedux = useAppSelector((state) => state.user.user_name);
  const isLoggedIn = useMemo(() => !isNil(userNameRedux), [userNameRedux]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState('4');
  const navigate = useNavigate();
  const location = useLocation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem('user_name');
    dispatch(logoutRedux());
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setSelectedKey('3');
        break;
      case '/dashboard':
        setSelectedKey('4');
        break;
      case '/learning':
        setSelectedKey('5');
        break;
      case '/login':
        setSelectedKey('1');
        break;
    }
  }, [location.pathname]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '4') {
      navigate('/dashboard');
    } else if (e.key === '3') {
      navigate('/');
    }
  };

  const MenuItems = [
    { key: 3, label: 'Home' },
    { key: 4, label: 'Dashboard' },
  ];
  return (
    <Layout style={{ height: '100%' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          color: 'black',
          background: 'white',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={MenuItems}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        {!isLoggedIn && (
          <Button type="text" onClick={() => showModal()}>
            Login
          </Button>
        )}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          {isLoggedIn && <Avatar size="large" icon={<UserOutlined />} />}
          {isLoggedIn && (
            <Button
              onClick={() => handleLogOut()}
              color="danger"
              variant="outlined"
              shape="circle"
              icon={<FontAwesomeIcon className="logout-icon" icon={faRightFromBracket} />}
            />
          )}
        </div>
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            height: '100%',
            paddingLeft: 70,
            backgroundColor: '#EADDEA',
          }}
        >
          <Routes>
            <Route path="/login" element={<Login handleOk={handleOk} />} />
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/learning" element={<Learning />} />
          </Routes>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          background: '#EADDEA',
        }}
      ></Footer>
      <Modal
        destroyOnClose
        closable={false}
        title={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Login handleOk={handleOk} />
      </Modal>
    </Layout>
  );
};

export default App;
