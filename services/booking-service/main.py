import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
import psycopg2

app = FastAPI()

DATABASE_URL = os.getenv('DATABASE_URL')
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
GOOGLE_REFRESH_TOKEN = os.getenv('GOOGLE_REFRESH_TOKEN')

class BookingRequest(BaseModel):
    service: str
    staff: str = None
    start: str
    end: str
    name: str
    phone: str

@app.get('/health')
def health():
    return {"status": "ok"}

@app.post('/book_appointment')
def book_appointment(req: BookingRequest):
    # Authenticate with Google Calendar
    creds = Credentials(
        None,
        refresh_token=GOOGLE_REFRESH_TOKEN,
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        token_uri='https://oauth2.googleapis.com/token'
    )
    service = build('calendar', 'v3', credentials=creds)
    event = {
        'summary': f"{req.service} for {req.name}",
        'description': f"Staff: {req.staff}, Phone: {req.phone}",
        'start': {'dateTime': req.start, 'timeZone': 'UTC'},
        'end': {'dateTime': req.end, 'timeZone': 'UTC'},
        'attendees': [{'email': req.phone + '@sms.gateway'}]
    }
    try:
        created_event = service.events().insert(calendarId='primary', body=event).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    # Optionally, store booking in Postgres
    # TODO: Add conflict checks and DB insert
    return {"eventId": created_event.get('id'), "status": "booked"}
