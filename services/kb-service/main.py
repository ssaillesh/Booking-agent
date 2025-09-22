import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from pgvector.psycopg2 import register_vector

app = FastAPI()

DATABASE_URL = os.getenv('DATABASE_URL')

class KBQuery(BaseModel):
    query: str
    top_k: int = 3

@app.get('/health')
def health():
    return {"status": "ok"}

@app.post('/search_kb')
def search_kb(q: KBQuery):
    # Connect to Postgres
    conn = psycopg2.connect(DATABASE_URL)
    register_vector(conn)
    cur = conn.cursor()
    # Dummy: return top_k static results (replace with ANN search)
    # TODO: Implement embedding and similarity search
    results = [
        {"title": "Cancellation Policy", "snippet": "You can cancel up to 24 hours before your appointment."},
        {"title": "Pricing", "snippet": "Our standard rate is $50 per session."}
    ][:q.top_k]
    cur.close()
    conn.close()
    return {"results": results}
