require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Twilio Voice webhook: answers call and returns TwiML to start Media Stream
app.post('/twilio/voice/answer', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  response.say('Hello, you are speaking to the AI receptionist.');
  response.start({
    stream: {
      url: `${process.env.MEDIA_STREAM_WS_URL || 'wss://yourdomain.com/twilio-media'}`,
      track: 'both_tracks',
    },
  });
  res.type('text/xml');
  res.send(response.toString());
});

// Twilio Media Streams WebSocket endpoint
const wss = new WebSocket.Server({ port: 6000 });
wss.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    // Handle Twilio Media Streams messages: start, media, stop
    // For now, just echo back received audio frames (for bidirectional demo)
    try {
      const msg = JSON.parse(message);
      if (msg.event === 'media') {
        // Echo PCM audio back to Twilio (replace with AI audio later)
        ws.send(JSON.stringify({ event: 'media', media: msg.media }));
      }
      // Handle start/stop events as needed
    } catch (err) {
      console.error('WS message error:', err);
    }
  });
  ws.on('close', () => {
    // Clean up session
  });
});

app.listen(PORT, () => {
  console.log(`Telephony Gateway listening on port ${PORT}`);
  console.log(`Twilio Media Streams WS listening on port 6000`);
});
