from fastapi.testclient import TestClient
from app.main import app
from app.logging_config import logger

client = TestClient(app)

def test_signup():
    response = client.post("/auth/signup", json={"email": "test@example.com", "password": "securepassword"})
    assert response.status_code == 200
    assert "id" in response.json()