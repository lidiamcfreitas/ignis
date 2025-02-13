import os
from fastapi import FastAPI, Depends, HTTPException, Request
from firebase_admin import auth, credentials, initialize_app
from google.cloud import firestore
from app.models.users import User
from dotenv import load_dotenv
from logging_config import logger
from starlette.middleware.base import BaseHTTPMiddleware

# Load environment variables from .env
load_dotenv()

# Get Firebase credential path from .env
firebase_cred_path = os.getenv("FIREBASE_CREDENTIALS")

# Ensure the path is set correctly
if not firebase_cred_path or not os.path.exists(firebase_cred_path):
    raise FileNotFoundError(f"Firebase credential file not found at {firebase_cred_path}")

# Initialize Firebase Admin SDK
cred = credentials.Certificate(firebase_cred_path)

firebase_app = initialize_app(cred)

# Firestore DB
db = firestore.Client()

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI + Firebase!"}

@app.exception_handler(Exception)
def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return {"error": "Internal server error"}

@app.post("/auth/signup")
def signup(user: User):
    try:
        user_record = auth.create_user(email=user.email, password=user.password)
        db.collection("users").document(user_record.uid).set(user.dict())
        return {"uid": user_record.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

class LogRequestsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.info(f"Received request: {request.method} {request.url}")
        response = await call_next(request)
        logger.info(f"Response: {response.status_code}")
        return response

app.add_middleware(LogRequestsMiddleware)