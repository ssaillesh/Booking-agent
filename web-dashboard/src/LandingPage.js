import React from 'react';
import { Layout, Row, Col, Typography, Button, Card, Divider } from 'antd';
import { PhoneOutlined, CalendarOutlined, MessageOutlined, UserSwitchOutlined, BarChartOutlined, LineChartOutlined } from '@ant-design/icons';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ChartTitle, Tooltip, Legend);

const { Title, Paragraph } = Typography;
const { Footer } = Layout;

const features = [
  {
    icon: <PhoneOutlined style={{ fontSize: 40, color: '#1890ff' }} />,
    title: '24/7 Phone Receptionist',
    desc: 'Always available to answer calls and greet your customers.'
  },
  {
    icon: <CalendarOutlined style={{ fontSize: 40, color: '#52c41a' }} />,
    title: 'Appointment Scheduling',
    desc: 'Book appointments directly into your Google Calendar.'
  },
  {
    icon: <MessageOutlined style={{ fontSize: 40, color: '#faad14' }} />,
    title: 'SMS Confirmations',
    desc: 'Send instant SMS confirmations and reminders.'
  },
  {
    icon: <UserSwitchOutlined style={{ fontSize: 40, color: '#13c2c2' }} />,
    title: 'Escalate to Human',
    desc: 'Warm transfer to a human agent when needed.'
  }
];


// Demo chart data
const callLogData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Calls Answered',
      data: [12, 19, 14, 17, 22, 15, 10],
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
      borderWidth: 2,
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Missed Calls',
      data: [2, 3, 1, 2, 1, 4, 2],
      backgroundColor: '#faad14',
      borderColor: '#faad14',
      borderWidth: 2,
      fill: false,
      tension: 0.4,
    }
  ]
};

const bookingData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Bookings',
      data: [5, 8, 6, 7, 9, 4, 3],
      backgroundColor: '#52c41a',
      borderColor: '#52c41a',
      borderWidth: 2,
    }
  ]
};

const logTrackerData = {
  labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm'],
  datasets: [
    {
      label: 'Active Sessions',
      data: [2, 4, 3, 5, 6, 4, 2],
      backgroundColor: '#13c2c2',
      borderColor: '#13c2c2',
      borderWidth: 2,
    }
  ]
};

function LandingPage() {
  return (
    <Layout style={{ background: '#fff' }}>
      {/* Hero Section */}
      <section style={{ padding: '96px 0 64px 0', textAlign: 'center', background: 'linear-gradient(180deg, #fff 80%, #f6f8fa 100%)' }}>
        <Title style={{ fontSize: '3rem', fontWeight: 700, marginBottom: 16 }}>Your 24/7 AI Receptionist.</Title>
        <Paragraph style={{ fontSize: '1.5rem', color: '#555', marginBottom: 32 }}>
          Answer calls, book appointments, and never miss a customer—powered by conversational AI.
        </Paragraph>
        <div style={{ marginBottom: 32 }}>
          <PhoneOutlined style={{ fontSize: 80, color: '#1890ff' }} />
        </div>
        <Button type="primary" size="large" style={{ borderRadius: 24, marginRight: 16 }}>Get Started</Button>
        <Button type="link" size="large">See How It Works</Button>
      </section>

      {/* Analytics Section */}
      <section style={{ padding: '64px 0', background: '#fff' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
          <BarChartOutlined /> Analytics Overview
        </Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 16, minHeight: 320 }}>
              <Title level={4} style={{ marginBottom: 16 }}><LineChartOutlined /> Call Log Tracker</Title>
              <Line data={callLogData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 16, minHeight: 320 }}>
              <Title level={4} style={{ marginBottom: 16 }}><CalendarOutlined /> Bookings</Title>
              <Bar data={bookingData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 16, minHeight: 320 }}>
              <Title level={4} style={{ marginBottom: 16 }}><UserSwitchOutlined /> Active Sessions</Title>
              <Bar data={logTrackerData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </Card>
          </Col>
        </Row>
      </section>

      <Divider />

      {/* Features Section */}
      <section style={{ padding: '64px 0', background: '#f6f8fa' }}>
        <Row gutter={[32, 32]} justify="center">
          {features.map((f, idx) => (
            <Col xs={24} md={12} lg={6} key={f.title}>
              <Card hoverable style={{ textAlign: 'center', borderRadius: 16, minHeight: 220 }}>
                {f.icon}
                <Title level={4} style={{ marginTop: 16 }}>{f.title}</Title>
                <Paragraph>{f.desc}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Demo Section */}
      <section style={{ padding: '64px 0', textAlign: 'center', background: '#fff' }}>
        <Title level={3}>Hear it in action.</Title>
        <Paragraph>Listen to a demo call and see the AI in action.</Paragraph>
        <Button type="primary" shape="circle" size="large" icon={<PhoneOutlined />} style={{ marginBottom: 16 }} />
        <div style={{ height: 40, background: '#e6f7ff', borderRadius: 20, width: 200, margin: '0 auto' }} />
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '64px 0', background: '#f6f8fa' }}>
        <Title level={3} style={{ textAlign: 'center' }}>What Our Customers Say</Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 16 }}>
              <Paragraph style={{ fontStyle: 'italic' }}>
                “Our customers get answers instantly—even after hours.”
              </Paragraph>
              <Paragraph strong>– Small Business Owner</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 16 }}>
              <Paragraph style={{ fontStyle: 'italic' }}>
                “Booking appointments is now effortless and fast.”
              </Paragraph>
              <Paragraph strong>– Clinic Manager</Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '64px 0', background: '#fff' }}>
        <Title level={3} style={{ textAlign: 'center' }}>Plans that scale with you.</Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px #eee' }}>
              <Title level={4}>Starter</Title>
              <Paragraph>$49/mo</Paragraph>
              <Button type="primary" style={{ borderRadius: 24 }}>Choose Starter</Button>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px #eee' }}>
              <Title level={4}>Professional</Title>
              <Paragraph>$99/mo</Paragraph>
              <Button type="primary" style={{ borderRadius: 24 }}>Choose Professional</Button>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px #eee' }}>
              <Title level={4}>Enterprise</Title>
              <Paragraph>Contact Us</Paragraph>
              <Button type="primary" style={{ borderRadius: 24 }}>Contact Sales</Button>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Footer */}
      <Footer style={{ background: '#222', color: '#fff', textAlign: 'center', padding: '32px 0' }}>
        <Row justify="center" gutter={16}>
          <Col>
            <Title level={5} style={{ color: '#fff', marginBottom: 0 }}>AI Front Desk</Title>
          </Col>
          <Col>
            <Button type="link" style={{ color: '#fff' }}>Features</Button>
          </Col>
          <Col>
            <Button type="link" style={{ color: '#fff' }}>Pricing</Button>
          </Col>
          <Col>
            <Button type="link" style={{ color: '#fff' }}>Contact</Button>
          </Col>
          <Col>
            <Button type="link" style={{ color: '#fff' }}>Docs</Button>
          </Col>
        </Row>
        <Paragraph style={{ color: '#aaa', marginTop: 16 }}>
          © {new Date().getFullYear()} AI Front Desk. All rights reserved. | Privacy
        </Paragraph>
      </Footer>
    </Layout>
  );
}

export default LandingPage;
