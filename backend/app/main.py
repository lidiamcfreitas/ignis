from fastapi import FastAPI, Depends, HTTPException
from firebase_admin import auth, credentials, initialize_app
from google.cloud import firestore
from app.models.users import User

# Initialize Firebase Admin SDK
cred = credentials.Certificate("firebase_config.json")
firebase_app = initialize_app(cred)

# Firestore DB
db = firestore.Client()

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI + Firebase!"}

@app.post("/auth/signup")
def signup(user: User):
    try:
        user_record = auth.create_user(email=user.email, password=user.password)
        db.collection("users").document(user_record.uid).set(user.dict())
        return {"uid": user_record.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

