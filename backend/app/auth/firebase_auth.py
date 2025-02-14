import os
from dotenv import load_dotenv
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer
from firebase_admin import auth
from app.logging_config import logger

security = HTTPBearer()

# Load environment variables
load_dotenv()

# Bypass authentication in development mode.
DISABLE_AUTH = os.getenv("DISABLE_AUTH", "false")
APP_NAME = os.getenv("APP_NAME", "app-name")
LOG_FILE = os.getenv("LOG_FILE")

def verify_firebase_token(authorization=Security(security)):
    """Verifies Firebase ID token and extracts user data"""
    # Bypass authentication in development mode.
    if DISABLE_AUTH == "true":
        logger.info("Disabling authentication for request.")
        return {"id": "test-uid", "email": "test@example.com", "provider": "test-provider"}

    try:
        logger.info("Validating user credentials.")
        token = authorization.credentials  # Extract token from request
        decoded_token = auth.verify_id_token(token)  # ✅ Firebase verification
        return {
            "id": decoded_token["uid"],
            "email": decoded_token.get("email"),
            "provider": decoded_token.get("firebase", {}).get("sign_in_provider"),
            "display_name": decoded_token.get("name"),
            "photo_url": decoded_token.get("picture"),
        }
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
