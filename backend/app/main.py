import os
from fastapi import FastAPI, Depends, HTTPException, Request

from app.models.users import User
from app.logging_config import logger, LogRequestsMiddleware
from app.api.router import router
from app.firebase_config import db

app = FastAPI()

# Include API routes
app.include_router(router)

app.add_middleware(LogRequestsMiddleware)

@app.exception_handler(Exception)
def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return {"error": "Internal server error"}

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI + Firebase!"}
