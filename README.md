# AI Phone Receptionist System

Production-ready AI phone receptionist with Twilio, OpenAI Realtime, Google Calendar, Postgres/pgvector, and web dashboard. 

## Services
- telephony-gateway (Node.js/Express)
- voice-brain (Node.js/Express)
- kb-service (Python/FastAPI)
- booking-service (Python/FastAPI)
- web-dashboard (React)

- Services

telephony-gateway (Node.js/Express)
Handles all inbound/outbound telephony with Twilio. Accepts incoming calls via TwiML, establishes Media Streams (bi-directional audio over WebSocket), and forwards raw audio to the voice-brain. It also streams synthesized audio back to Twilio so callers hear the AI’s voice. Responsible for phone number provisioning, call session management, and SMS relay.

voice-brain (Node.js/Express)
The core conversation orchestrator. Manages the real-time loop of ASR → LLM → TTS. Connects to OpenAI Realtime (or alternative Deepgram + ElevenLabs) for live transcription and speech synthesis. Maintains conversational state (service, time, customer info), handles barge-in, executes tool calls (e.g., booking, knowledge lookup), and produces transcripts.

kb-service (Python/FastAPI)
Provides the knowledge base (RAG) functionality. Ingests business FAQs, policies, and documents, chunks and embeds them with pgvector, and exposes APIs to search the KB when the voice-brain needs to answer questions. Ensures answers are grounded in the client’s data instead of hallucinated.

booking-service (Python/FastAPI)
Integrates with Google Calendar (and other schedulers) to check availability, create bookings, reschedule, or cancel appointments. Exposes clean endpoints (find_availability, book_appointment) for the voice-brain to call during live conversations. Handles timezone/DST edge cases and confirmations.

web-dashboard (React)
A multi-tenant admin and client portal. Businesses (or resellers in white-label setups) can configure their receptionist: upload/edit knowledge base content, view call logs and transcripts, manage phone numbers, set branding, and see analytics. Provides per-tenant settings for integrations (e.g., Google, HubSpot, Stripe).
## How to Run (Developer Guide)

### Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop) and ensure Docker is running.
- Clone this repository and open a terminal in the project root.

### Setup Steps
1. Copy all `.env.example` files to `.env` for each service:
	```sh
	cp services/telephony-gateway/.env.example services/telephony-gateway/.env
	cp services/voice-brain/.env.example services/voice-brain/.env
	cp services/kb-service/.env.example services/kb-service/.env
	cp services/booking-service/.env.example services/booking-service/.env
	cp web-dashboard/.env.example web-dashboard/.env
	```
2. Fill in all required secrets and API keys in the `.env` files (see below for required keys).
3. Build and start all services:
	```sh
	docker compose up --build
	```
4. Access the web dashboard at [http://localhost:3000](http://localhost:3000).
5. Access backend services at:
	- Telephony Gateway: [http://localhost:5000](http://localhost:5000)
	- Voice Brain: [http://localhost:5001](http://localhost:5001)
	- KB Service: [http://localhost:8000](http://localhost:8000)
	- Booking Service: [http://localhost:8001](http://localhost:8001)

### Running Tests
- For Node.js services:
  ```sh
  cd services/<service>
  npm install
  npm test
  ```
- For Python services:
  ```sh
  cd services/<service>
  pytest
  ```

### Troubleshooting
- If you see errors about missing `.env` files, repeat step 1 above.
- If the database fails to start, ensure you are using the correct `pgvector` image in `docker-compose.yml`.
- For frontend errors, run `npm install` in `web-dashboard` and rebuild.

## Environment Variables
See `.env.example` in each service for required keys.

## References
- Twilio Media Streams: https://www.twilio.com/docs/voice/media-streams
- OpenAI Realtime API: https://openai.com/index/introducing-gpt-realtime/
- Deepgram Streaming ASR: https://developers.deepgram.com/docs/live-streaming-audio
- Google Calendar API: https://developers.google.com/workspace/calendar/api/v3/reference/events/insert
- pgvector: https://github.com/pgvector/pgvector
- ElevenLabs Streaming TTS: https://elevenlabs.io/docs/api-reference/text-to-speech/stream
