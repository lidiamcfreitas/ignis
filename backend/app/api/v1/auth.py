from fastapi import APIRouter, HTTPException, Depends
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
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me")
def get_current_user(user_data=Depends(verify_firebase_token)):
    """Get the logged-in user's profile."""
    return UserService.get(user_data["id"])