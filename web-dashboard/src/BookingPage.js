import React, { useState } from 'react';
import { Card, Typography, Form, Input, DatePicker, TimePicker, Button, List, Space, message, Modal, Tag, Tooltip, Progress } from 'antd';
import { CalendarOutlined, UserOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const initialBookings = [
  {
    id: 1,
    name: 'John Doe',
    date: '2025-09-23',
    time: '10:00',
    status: 'confirmed',
    reason: 'Consultation',
    details: 'First-time consult, bring documents.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    date: '2025-09-24',
    time: '14:30',
    status: 'pending',
    reason: 'Follow-up',
    details: 'Review previous results.',
  },
];

function BookingPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [form] = Form.useForm();
  const [modal, setModal] = useState({ open: false, booking: null });

  const handleSubmit = (values) => {
    const newBooking = {
      id: bookings.length + 1,
      name: values.name,
      date: values.date.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      status: 'pending',
      reason: values.reason,
      details: values.details || '',
    };
    setBookings([...bookings, newBooking]);
    message.success('Booking request submitted!');
    form.resetFields();
  };

  const handleView = (booking) => {
    setModal({ open: true, booking });
  };

  const handleModalClose = () => {
    setModal({ open: false, booking: null });
  };

  const getStatusTag = (status) => {
    if (status === 'confirmed') return <Tag color="green" icon={<CheckCircleOutlined />}>Confirmed</Tag>;
    if (status === 'pending') return <Tag color="gold" icon={<InfoCircleOutlined />}>Pending</Tag>;
    return <Tag color="default">Unknown</Tag>;
  };

  return (
    <Card style={{ maxWidth: 950, margin: '40px auto', borderRadius: 20, boxShadow: '0 8px 32px #e6f7ff', background: 'linear-gradient(120deg, #fff 80%, #f6f8fa 100%)' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 8, letterSpacing: 1 }}>
        <CalendarOutlined /> Booking Management
      </Title>
      <Paragraph style={{ textAlign: 'center', color: '#555', marginBottom: 32, fontSize: '1.2rem' }}>
        Schedule, view, and manage appointments.<br />
        <span style={{ color: '#1890ff' }}>Dynamic status, details, and interactive controls.</span>
      </Paragraph>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 600, margin: '0 auto 32px auto', background: '#f6f8fa', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px #eee' }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}> 
          <Input prefix={<UserOutlined />} placeholder="Full Name" />
        </Form.Item>
        <Form.Item name="reason" label="Reason" rules={[{ required: true, message: 'Please enter a reason' }]}> 
          <Input placeholder="Reason for appointment" />
        </Form.Item>
        <Form.Item name="details" label="Details (optional)"> 
          <Input.TextArea placeholder="Additional details or notes" rows={2} />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date' }]}> 
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please select a time' }]}> 
          <TimePicker format="HH:mm" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block icon={<CalendarOutlined />}>Book Appointment</Button>
        </Form.Item>
      </Form>
      <Title level={4} style={{ marginTop: 24, marginBottom: 8 }}>Upcoming Bookings</Title>
      <List
        grid={{ gutter: 24, column: 2 }}
        dataSource={bookings}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              style={{ borderRadius: 16, boxShadow: '0 2px 12px #eee', marginBottom: 16, transition: 'box-shadow 0.2s' }}
              actions={[
                <Tooltip title="View Details"><Button type="link" onClick={() => handleView(item)}>View</Button></Tooltip>
              ]}
            >
              <Space direction="vertical" size="small">
                <Space align="center">
                  <CalendarOutlined style={{ fontSize: 28, color: item.status === 'confirmed' ? '#52c41a' : '#faad14' }} />
                  <Title level={5} style={{ marginBottom: 0 }}>{item.name}</Title>
                </Space>
                <Paragraph type="secondary" style={{ marginBottom: 4 }}>{item.date} {item.time}</Paragraph>
                {getStatusTag(item.status)}
                <Paragraph style={{ marginBottom: 0 }}><b>Reason:</b> {item.reason}</Paragraph>
                <Progress percent={item.status === 'confirmed' ? 100 : 60} status={item.status === 'confirmed' ? 'success' : 'active'} size="small" style={{ width: 120 }} />
              </Space>
            </Card>
          </List.Item>
        )}
        style={{ marginTop: 16 }}
      />
      <Modal
        open={modal.open}
        title={`Booking Details`}
        onCancel={handleModalClose}
        footer={null}
      >
        {modal.booking && (
          <Space direction="vertical" size="large">
            <Paragraph><UserOutlined /> <b>Name:</b> {modal.booking.name}</Paragraph>
            <Paragraph><CalendarOutlined /> <b>Date:</b> {modal.booking.date}</Paragraph>
            <Paragraph><ClockCircleOutlined /> <b>Time:</b> {modal.booking.time}</Paragraph>
            <Paragraph><b>Reason:</b> {modal.booking.reason}</Paragraph>
            <Paragraph><b>Details:</b> {modal.booking.details}</Paragraph>
            <Paragraph>
              <b>Status:</b> {getStatusTag(modal.booking.status)}
            </Paragraph>
          </Space>
        )}
      </Modal>
    </Card>
  );
}

export default BookingPage;
