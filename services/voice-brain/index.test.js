
const WebSocket = require('ws');
describe('Voice Brain WebSocket', () => {
  let ws;
  beforeAll((done) => {
    ws = new WebSocket('ws://localhost:6100');
    ws.on('open', done);
  });
  afterAll(() => {
    ws.close();
  });

  test('should start and end session', (done) => {
    ws.on('message', (data) => {
      const msg = JSON.parse(data);
      if (msg.event === 'session_started') {
        expect(msg.sessionId).toBeDefined();
        ws.send(JSON.stringify({ event: 'end', sessionId: msg.sessionId }));
      } else if (msg.event === 'session_ended') {
        expect(msg.sessionId).toBeDefined();
        done();
      }
    });
    ws.send(JSON.stringify({ event: 'start' }));
  });

  test('should echo media', (done) => {
    ws.on('message', (data) => {
      const msg = JSON.parse(data);
      if (msg.event === 'media') {
        expect(msg.media).toBe('test-audio');
        done();
      }
    });
    ws.send(JSON.stringify({ event: 'media', media: 'test-audio' }));
  });

  test('should respond to text', (done) => {
    ws.on('message', (data) => {
      const msg = JSON.parse(data);
      if (msg.event === 'text') {
        expect(typeof msg.text).toBe('string');
        expect(msg.text.length).toBeGreaterThan(0);
        done();
      }
    });
    ws.send(JSON.stringify({ event: 'text', text: 'Hello!' }));
  });
});
