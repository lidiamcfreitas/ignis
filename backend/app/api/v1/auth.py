from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.services.user_service import UserService

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "I'm in the auth router!"}

@router.post("/signup")
def signup(user: User):
    try:
        return UserService.create(user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
