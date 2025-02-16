import os
# Set this before importing the app
os.environ["DISABLE_AUTH"] = "true"

from fastapi.testclient import TestClient
import pytest
from app.main import app

client = TestClient(app)

@pytest.fixture
def mock_auth(mocker):
    """Mock Firebase authentication for tests."""
    return mocker.patch("app.auth.firebase_auth.verify_firebase_token", return_value={
        "uid": "test-uid",
        "email": "test@example.com",
        "provider": "test-provider"
    })

def test_login_without_auth(mock_auth):
    """Test login endpoint without requiring Firebase authentication."""
    headers = {"Authorization": "Bearer mock-token"}
    response = client.post("/auth/login", headers=headers)
    assert response.status_code == 200
    assert response.json()["id"] == "test-uid"

def test_me_without_auth(mock_auth):
    headers = {"Authorization": "Bearer mock-token"}
    response = client.get("/auth/me", headers=headers)
    assert response.status_code == 200
    assert response.json()["id"] == "test-uid"