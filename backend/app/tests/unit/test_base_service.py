from datetime import datetime
import pytest
from unittest.mock import MagicMock
from app.services.base_service import BaseService
from app.models.user import User
from typing import Dict, Any
from app.tests.conftest import mock_firestore


# Create a Mock Service that Inherits from BaseService
class MockUserService(BaseService[User]):
    collection_name = "users"
    model = User

@pytest.fixture
def sample_user_data() -> Dict[str, Any]:
    return {
        'email': 'test@example.com',
        'id': 'test-uid',
        'provider': 'test-provider',
        'created_at': datetime.utcnow(),
        'updated_at': datetime.utcnow()
    }

# Test Create Function
def test_create(mock_firestore, sample_user_data):
    mock_firestore.collection.return_value.add.return_value = (
        None,
        MagicMock(
            id=sample_user_data['id'],
            data={k: v for k, v in sample_user_data.items() if k != 'id'}
        )
    )

    user = MockUserService.create(User(**sample_user_data))
    
    assert user.id == "test-uid"
    assert user.email == sample_user_data["email"]

# Test Get Function
def test_get(mock_firestore, sample_user_data):
    mock_doc = MagicMock()
    mock_doc.exists = True
    mock_doc.id = sample_user_data["id"]
    mock_doc.to_dict.return_value = sample_user_data
    mock_firestore.collection.return_value.document.return_value.get.return_value = mock_doc

    user = MockUserService.get("test-uid")
    
    # Add assertions
    assert user is not None
    assert user.id == sample_user_data["id"]
    assert user.email == sample_user_data["email"]
    assert user.provider == sample_user_data["provider"]

# Test Update Function
def test_update(mock_firestore):
    mock_firestore.collection.return_value.document.return_value.get.return_value.exists = True
    mock_firestore.collection.return_value.document.return_value.update.return_value = None

    success = MockUserService.update("test-uid", {"email": "new@example.com"})

    assert success is True

# Test Delete Function
def test_delete(mock_firestore):
    mock_firestore.collection.return_value.document.return_value.get.return_value.exists = True
    mock_firestore.collection.return_value.document.return_value.delete.return_value = None

    success = MockUserService.delete("test-uid")

    assert success is True
