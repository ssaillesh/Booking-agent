const request = require('supertest');
const express = require('express');
let app;
beforeAll(() => {
  app = require('./index');
});
describe('Telephony Gateway', () => {
  it('should respond to Twilio webhook', async () => {
    const res = await request(app)
      .post('/twilio/voice/answer')
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('text/xml');
    expect(res.text).toContain('<Start><Stream');
  });
});
