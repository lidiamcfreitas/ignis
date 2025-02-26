from fastapi import APIRouter, HTTPException, Depends
from app.logging_config import logger
from typing import Optional
from pydantic import BaseModel

class UpdateUserProfile(BaseModel):
    display_name: Optional[str] = None
    photo_url: Optional[str] = None

from app.models.user import User
from app.services.user_service import UserService
from app.auth.firebase_auth import verify_firebase_token

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "I'm in the auth router!"}

@router.post("/login")
def login(user_data=Depends(verify_firebase_token)):
    """Verify token and return user profile"""
    logger.debug(f"Login attempt for user {user_data['id']}")
    try:
        user = UserService.create(
            User(
                id=user_data["id"],
                email=user_data["email"],
                provider=user_data["provider"],
                display_name=user_data.get("display_name"),
                photo_url=user_data.get("photo_url"),
            )
        )
        logger.info(f"Successfully logged in user {user_data['id']}")
        return user
    except Exception as e:
        logger.error(f"Login failed for user {user_data['id']}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me")
def get_current_user(user_data=Depends(verify_firebase_token)):
    """Get the logged-in user's profile."""
    user_id = user_data["id"]
    logger.debug(f"Fetching profile for user {user_id}")
    try:
        user = UserService.get(user_id)
        logger.info(f"Successfully fetched profile for user {user_id}")
        return user
    except Exception as e:
        logger.error(f"Error fetching profile for user {user_id}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/profile")
def update_profile(update_data: UpdateUserProfile, user_data=Depends(verify_firebase_token)):
    """Update the logged-in user's profile."""
    logger.debug(f"Attempting to update profile for user {user_data['id']}")
    try:
        user_id = user_data["id"]
        success = UserService.update(user_id, update_data.model_dump(exclude_unset=True))
        if not success:
            raise HTTPException(status_code=404, detail="User not found")
        user = UserService.get(user_id)
        logger.info(f"Successfully updated profile for user {user_id}")
        return user
    except Exception as e:
        logger.error(f"Error updating profile for user {user_id}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
