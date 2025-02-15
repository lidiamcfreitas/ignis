from pydantic import EmailStr
from app.models.base import BaseSchema
from typing import Optional

class User(BaseSchema):
    # id: str  # Firebase UID (used as Firestore document ID)
    email: EmailStr
    provider: Optional[str] = "email"  # e.g., google.com, github.com
    display_name: Optional[str] = None
    photo_url: Optional[str] = None