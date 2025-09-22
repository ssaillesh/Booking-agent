from fastapi.testclient import TestClient
from main import app
from fastapi.testclient import TestClient
from main import app

def test_health():
    client = TestClient(app)
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_search_kb():
    client = TestClient(app)
    payload = {"query": "cancellation policy", "top_k": 2}
    response = client.post('/search_kb', json=payload)
    assert response.status_code == 200
    results = response.json()["results"]
    assert len(results) == 2
    assert results[0]["title"] == "Cancellation Policy"
