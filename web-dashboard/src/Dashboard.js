

import React from 'react';
import { Layout, Card, Typography, Button, Row, Col } from 'antd';
import { SmileOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

function Dashboard() {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#001529', padding: '0 24px' }}>
        <Title style={{ color: '#fff', margin: 0 }} level={3}>AI Front Desk Dashboard</Title>
      </Header>
      <Content style={{ margin: '32px' }}>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={8}>
            <Card hoverable style={{ textAlign: 'center', borderRadius: 16 }}>
              <SmileOutlined style={{ fontSize: 48, color: 'rgba(9, 47, 83, 1)' }} />
              <Title level={4} style={{ marginTop: 16 }}>Welcome!</Title>
              <Paragraph>Get started by exploring call logs, bookings, and knowledge base management.</Paragraph>
              <Button type="primary" size="large">View Analytics</Button>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable style={{ textAlign: 'center', borderRadius: 16 }}>
              <PhoneOutlined style={{ fontSize: 48, color: '#52c41a' }} />
              <Title level={4} style={{ marginTop: 16 }}>Recent Calls</Title>
              <Paragraph>See who called, when, and call outcomes. (Demo data)</Paragraph>
              <Button>View Calls</Button>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable style={{ textAlign: 'center', borderRadius: 16 }}>
              <CalendarOutlined style={{ fontSize: 48, color: '#faad14' }} />
              <Title level={4} style={{ marginTop: 16 }}>Upcoming Bookings</Title>
              <Paragraph>Check scheduled appointments and manage bookings.</Paragraph>
              <Button>View Bookings</Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Dashboard;
