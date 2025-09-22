
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  BookOutlined,
  SettingOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import LandingPage from './LandingPage';
import KBAdmin from './KBAdmin';
import BookingPage from './BookingPage';
import Settings from './Settings';

const { Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FileTextOutlined />}>
              <Link to="/kb">KB Admin</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<BookOutlined />}>
              <Link to="/bookings">Bookings</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              <Link to="/settings">Settings</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '24px' }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/kb" element={<KBAdmin />} />
              <Route path="/bookings" element={<BookingPage />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
