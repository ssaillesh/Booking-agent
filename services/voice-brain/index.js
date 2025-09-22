require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Session state (in-memory for demo)
const sessions = {};

// WebSocket for real-time audio/text dialog
const wss = new WebSocket.Server({ port: 6100 });
wss.on('connection', (ws, req) => {
  let sessionId = null;
  ws.on('message', async (message) => {
    try {
      const msg = JSON.parse(message);
      if (msg.event === 'start') {
        // Start new session
        sessionId = msg.sessionId || Date.now().toString();
        sessions[sessionId] = { state: {}, transcript: [] };
        ws.send(JSON.stringify({ event: 'session_started', sessionId }));
      } else if (msg.event === 'media') {
        // Modular ASR: Deepgram
        if (USE_DEEPGRAM && DEEPGRAM_API_KEY) {
          const transcript = await transcribeWithDeepgram(msg.media);
          ws.send(JSON.stringify({ event: 'text', text: transcript }));
        } else {
          ws.send(JSON.stringify({ event: 'media', media: msg.media }));
        }
      } else if (msg.event === 'text') {
        // Handle incoming transcript, call OpenAI for response
        const prompt = msg.text;
        // Example: call OpenAI chat completion (replace with Realtime API)
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are a polite, concise receptionist. Track entities; confirm key updates; ask clarifying questions when uncertain; prefer short sentences; never invent prices/policies—always consult KB via search_kb.' },
            { role: 'user', content: prompt }
          ],
          stream: false
        });
        const reply = completion.choices[0].message.content;
        ws.send(JSON.stringify({ event: 'text', text: reply }));
        // Modular TTS: ElevenLabs
        if (USE_ELEVENLABS && ELEVENLABS_API_KEY) {
          const audioBase64 = await synthesizeWithElevenLabs(reply);
          ws.send(JSON.stringify({ event: 'tts', audio: audioBase64 }));
        }
      } else if (msg.event === 'end') {
        // End session
        if (sessionId) delete sessions[sessionId];
        ws.send(JSON.stringify({ event: 'session_ended', sessionId }));
      }
    } catch (err) {
      console.error('WS message error:', err);
    }
  });
  ws.on('close', () => {
    if (sessionId && sessions[sessionId]) delete sessions[sessionId];
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Voice Brain listening on port ${PORT}`);
  console.log(`Realtime WS listening on port 6100`);
});

const USE_DEEPGRAM = process.env.USE_DEEPGRAM === 'true';
const USE_ELEVENLABS = process.env.USE_ELEVENLABS === 'true';
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

async function transcribeWithDeepgram(audioBase64) {
  // Deepgram streaming ASR (demo: synchronous REST)
  const resp = await axios.post('https://api.deepgram.com/v1/listen', Buffer.from(audioBase64, 'base64'), {
    headers: {
      'Authorization': `Token ${DEEPGRAM_API_KEY}`,
      'Content-Type': 'audio/wav'
    },
    params: { model: 'nova', punctuate: true }
  });
  return resp.data.results.channels[0].alternatives[0].transcript;
}

async function synthesizeWithElevenLabs(text) {
  // ElevenLabs streaming TTS (demo: synchronous REST)
  const resp = await axios.post('https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/audio', {
    text,
    voice_settings: { stability: 0.5, similarity_boost: 0.5 }
  }, {
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json'
    },
    responseType: 'arraybuffer'
  });
  return Buffer.from(resp.data, 'binary').toString('base64');
}
