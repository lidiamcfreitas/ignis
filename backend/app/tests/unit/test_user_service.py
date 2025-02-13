import pytest
from unittest.mock import MagicMock
from app.services.user_service import UserService
from app.models.user import User

@pytest.fixture
def sample_user():
    return User(email="test@example.com", password="securepassword")

@pytest.fixture
def mock_firestore(mocker):
    return mocker.patch("app.services.base_service.db")

def test_create_user(mock_firestore, sample_user):
    mock_firestore.collection.return_value.add.return_value = (None, MagicMock(id="mock_id"))
    user = UserService.create(sample_user)
    
    assert user.id == "mock_id"
    assert user.email == sample_user.email
