import os
import pytest
from unittest.mock import patch, Mock
from fastapi import HTTPException
from fastapi.security import HTTPBearer
from app.auth.firebase_auth import verify_firebase_token

@pytest.fixture
def mock_request():
    mock = Mock()
    mock.credentials = "test-token"
    return mock

@pytest.fixture
def mock_valid_token_data():
    return {
        'uid': 'test-user-123',
        'email': 'test@example.com',
        'firebase': {'sign_in_provider': 'google.com'},
        'name': 'Test User',
        'picture': 'https://example.com/photo.jpg'
    }

@patch('app.auth.firebase_auth.DISABLE_AUTH', 'false')
def test_verify_firebase_token_production(mock_request, mock_valid_token_data):
    """
    Test successful token verification in production mode.
    
    Should properly verify token and extract user data.
    """
    with patch('firebase_admin.auth.verify_id_token') as mock_verify:
        mock_verify.return_value = mock_valid_token_data
        
        auth_data = verify_firebase_token(mock_request)
        
        assert auth_data == {
            'id': 'test-user-123',
            'email': 'test@example.com',
            'provider': 'google.com',
            'display_name': 'Test User',
            'photo_url': 'https://example.com/photo.jpg'
        }
        mock_verify.assert_called_once_with('test-token')

@patch('app.auth.firebase_auth.DISABLE_AUTH', 'false')
def test_verify_firebase_token_invalid(mock_request):
    """
    Test handling of invalid tokens.
    
    Should raise HTTPException with 401 status code.
    """
    with patch('firebase_admin.auth.verify_id_token') as mock_verify:
        mock_verify.side_effect = Exception('Invalid token')
        
        with pytest.raises(HTTPException) as exc_info:
            verify_firebase_token(mock_request)
            
        assert exc_info.value.status_code == 401
        assert str(exc_info.value.detail) == 'Invalid authentication token'

@patch('app.auth.firebase_auth.DISABLE_AUTH', 'true')
def test_verify_firebase_token_dev_mode(mock_request):
    """
    Test token verification bypass in development mode.
    
    Should return default test user data without verifying token.
    """
    auth_data = verify_firebase_token(mock_request)
    
    assert auth_data == {
        'id': 'test-uid',
        'email': 'test@example.com',
        'provider': 'test-provider'
    }