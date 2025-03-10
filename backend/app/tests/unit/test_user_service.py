from typing import Any, Dict
import pytest
from unittest.mock import MagicMock
from app.services.user_service import UserService
from app.models.user import User
from app.tests.conftest import mock_firestore

@pytest.fixture
def sample_user() -> Dict[str, Any]:
    return User(**{
        "id": "test-uid",
        "email": "test@example.com",
        "provider": "test-provider"
    })

def test_create_user(mock_firestore, sample_user):
    mock_firestore.collection.return_value.add.return_value = (None, MagicMock(id="test-uid"))
    user = UserService.create(sample_user)
    
    assert user.id == "test-uid"
    assert user.email == sample_user.email
