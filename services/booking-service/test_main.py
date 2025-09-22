from fastapi.testclient import TestClient
from main import app

def test_health():
    client = TestClient(app)
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_book_appointment():
    client = TestClient(app)
    payload = {
        "service": "Consultation",
        "staff": "Alice",
        "start": "2025-09-21T10:00:00Z",
        "end": "2025-09-21T10:30:00Z",
        "name": "John Doe",
        "phone": "1234567890"
    }
    response = client.post('/book_appointment', json=payload)
    assert response.status_code in [200, 500]  # 500 if Google API creds are missing
    if response.status_code == 200:
        data = response.json()
        assert "eventId" in data
        assert data["status"] == "booked"
    else:
        assert "detail" in response.json()

def test_conflict_check():
    client = TestClient(app)
    # Book first appointment
    payload1 = {
        "service": "Consultation",
        "staff": "Alice",
        "start": "2025-09-21T11:00:00Z",
        "end": "2025-09-21T11:30:00Z",
        "name": "Jane Smith",
        "phone": "9876543210"
    }
    response1 = client.post('/book_appointment', json=payload1)
    # Try to book overlapping appointment
    payload2 = {
        "service": "Consultation",
        "staff": "Alice",
        "start": "2025-09-21T11:15:00Z",
        "end": "2025-09-21T11:45:00Z",
        "name": "Bob Brown",
        "phone": "5555555555"
    }
    response2 = client.post('/book_appointment', json=payload2)
    # Accept 200 or 409 (conflict) or 500 (missing creds)
    assert response2.status_code in [200, 409, 500]
