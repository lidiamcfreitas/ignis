"""Instead of defining Firestore mock in every test file, store it in conftest.py so all tests can use it."""

import pytest
from unittest.mock import MagicMock

@pytest.fixture
def mock_firestore(mocker):
    return mocker.patch("app.services.base_service.db")
