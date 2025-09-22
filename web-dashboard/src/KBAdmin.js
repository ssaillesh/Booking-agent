import React, { useState } from 'react';
import { Card, Typography, Upload, Button, Input, Tabs, List, Space, message, Progress, Tooltip, Modal } from 'antd';
import { UploadOutlined, FilePdfOutlined, LinkOutlined, FileMarkdownOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';


const { Title, Paragraph } = Typography;

const initialSources = [
  { type: 'url', name: 'https://docs.twilio.com', icon: <LinkOutlined />, status: 'ready', preview: 'Twilio Docs: Voice, SMS, APIs' },
  { type: 'pdf', name: 'AI_Whitepaper.pdf', icon: <FilePdfOutlined />, status: 'processing', preview: 'AI Whitepaper summary...' },
  { type: 'md', name: 'README.md', icon: <FileMarkdownOutlined />, status: 'ready', preview: '# AI Receptionist\nProduction-ready...' },
];


function KBAdmin() {
  const [activeTab, setActiveTab] = useState('url');
  const [sources, setSources] = useState(initialSources);
  const [urlInput, setUrlInput] = useState('');
  const [previewModal, setPreviewModal] = useState({ open: false, content: '', title: '' });

  const handleUrlAdd = () => {
    if (!urlInput) return message.error('Please enter a URL');
    setSources([
      ...sources,
      {
        type: 'url',
        name: urlInput,
        icon: <LinkOutlined />,
        status: 'processing',
        preview: 'Fetching preview...'
      }
    ]);
    setUrlInput('');
    message.success('URL added to KB sources');
  };

  const handleFileUpload = (file, type) => {
    setSources([
      ...sources,
      {
        type,
        name: file.name,
        icon: type === 'pdf' ? <FilePdfOutlined /> : <FileMarkdownOutlined />,
        status: 'processing',
        preview: `Preview for ${file.name}`
      }
    ]);
    message.success(`${file.name} uploaded`);
    return false; // Prevent default upload
  };

  const handleDelete = (idx) => {
    setSources(sources.filter((_, i) => i !== idx));
    message.info('Source removed');
  };

  const handlePreview = (item) => {
    setPreviewModal({ open: true, content: item.preview, title: item.name });
  };

  const getStatusColor = (status) => {
    if (status === 'ready') return 'success';
    if (status === 'processing') return 'active';
    return 'normal';
  };

  return (
    <Card style={{ maxWidth: 950, margin: '40px auto', borderRadius: 20, boxShadow: '0 8px 32px #e6f7ff', background: 'linear-gradient(120deg, #fff 80%, #f6f8fa 100%)' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 8, letterSpacing: 1 }}>Knowledge Base Admin</Title>
      <Paragraph style={{ textAlign: 'center', color: '#555', marginBottom: 32, fontSize: '1.2rem' }}>
        Upload, ingest, and manage KB sources (URLs, PDFs, markdown).<br />
        <span style={{ color: '#1890ff' }}>Dynamic ingestion status, previews, and interactive controls.</span>
      </Paragraph>
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered style={{ marginBottom: 32, fontWeight: 500 }} animated>
        <Tabs.TabPane tab={<span><LinkOutlined /> URL</span>} key="url">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              placeholder="Paste a documentation or website URL"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              style={{ width: 400 }}
              allowClear
            />
            <Button type="primary" icon={<UploadOutlined />} onClick={handleUrlAdd}>
              Ingest URL
            </Button>
          </Space>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span><FilePdfOutlined /> PDF</span>} key="pdf">
          <Upload beforeUpload={file => handleFileUpload(file, 'pdf')} showUploadList={false} accept=".pdf">
            <Button icon={<UploadOutlined />}>Upload PDF</Button>
          </Upload>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span><FileMarkdownOutlined /> Markdown</span>} key="md">
          <Upload beforeUpload={file => handleFileUpload(file, 'md')} showUploadList={false} accept=".md,.markdown,.txt">
            <Button icon={<UploadOutlined />}>Upload Markdown</Button>
          </Upload>
        </Tabs.TabPane>
      </Tabs>
      <Title level={4} style={{ marginTop: 24, marginBottom: 8 }}>KB Sources</Title>
      <List
        grid={{ gutter: 24, column: 2 }}
        dataSource={sources}
        renderItem={(item, idx) => (
          <List.Item>
            <Card
              hoverable
              style={{ borderRadius: 16, boxShadow: '0 2px 12px #eee', marginBottom: 16, transition: 'box-shadow 0.2s' }}
              actions={[
                <Tooltip title="Preview"><Button type="text" icon={<EyeOutlined />} onClick={() => handlePreview(item)} /></Tooltip>,
                <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDelete(idx)} /></Tooltip>
              ]}
            >
              <Space align="start">
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <div>
                  <Title level={5} style={{ marginBottom: 0 }}>{item.name}</Title>
                  <Paragraph type="secondary" style={{ marginBottom: 4 }}>{item.type.toUpperCase()}</Paragraph>
                  <Progress percent={item.status === 'ready' ? 100 : 60} status={getStatusColor(item.status)} size="small" style={{ width: 120 }} />
                </div>
              </Space>
            </Card>
          </List.Item>
        )}
        style={{ marginTop: 16 }}
      />
      <Modal
        open={previewModal.open}
        title={previewModal.title}
        onCancel={() => setPreviewModal({ open: false, content: '', title: '' })}
        footer={null}
      >
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 15 }}>{previewModal.content}</pre>
      </Modal>
    </Card>
  );
}

export default KBAdmin;
