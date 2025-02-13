from fastapi import APIRouter, HTTPException
from firebase_admin import auth
from app.firebase_config import db
from app.models.users import User

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "I'm in the auth router!"}

@router.post("/signup")
def signup(user: User):
    try:
        user_record = auth.create_user(email=user.email, password=user.password)
        db.collection("users").document(user_record.uid).set(user.model_dump())
        return {"uid": user_record.uid, "email": user.email}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
