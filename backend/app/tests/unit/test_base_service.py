import pytest
from unittest.mock import MagicMock
from app.services.base_service import BaseService
from app.models.user import User
from typing import Dict, Any

# Mock Firestore Client
@pytest.fixture
def mock_firestore(mocker):
    mock_db = mocker.patch("app.services.base_service.db")
    return mock_db

# Create a Mock Service that Inherits from BaseService
class MockUserService(BaseService[User]):
    collection_name = "users"
    model = User

@pytest.fixture
def sample_user_data() -> Dict[str, Any]:
    return {"email": "test@example.com", "password": "securepassword"}

# Test Create Function
def test_create(mock_firestore, sample_user_data):
    mock_firestore.collection.return_value.add.return_value = (None, MagicMock(id="mock_id"))
    
    user = MockUserService.create(User(**sample_user_data))
    
    assert user.id == "mock_id"
    assert user.email == sample_user_data["email"]
    assert user.password == sample_user_data["password"]

# Test Get Function
def test_get(mock_firestore, sample_user_data):
    mock_doc = MagicMock()
    mock_doc.exists = True
    mock_doc.to_dict.return_value = sample_user_data
    mock_firestore.collection.return_value.document.return_value.get.return_value = mock_doc

    user = MockUserService.get("mock_id")
    
    assert user is not None
    assert user.email == sample_user_data["email"]

# Test Update Function
def test_update(mock_firestore):
    mock_firestore.collection.return_value.document.return_value.get.return_value.exists = True
    mock_firestore.collection.return_value.document.return_value.update.return_value = None

    success = MockUserService.update("mock_id", {"email": "new@example.com"})

    assert success is True

# Test Delete Function
def test_delete(mock_firestore):
    mock_firestore.collection.return_value.document.return_value.get.return_value.exists = True
    mock_firestore.collection.return_value.document.return_value.delete.return_value = None

    success = MockUserService.delete("mock_id")

    assert success is True
