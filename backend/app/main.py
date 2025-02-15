import os
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.logging_config import logger, LogRequestsMiddleware
from app.api.router import router
from app.firebase_config import db
from starlette.responses import FileResponse

app = FastAPI()

# Include API routes
app.include_router(router)

app.add_middleware(LogRequestsMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return {"error": "Internal server error"}

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI + Firebase!"}

# # Serve Vue frontend
# app.mount("/static", StaticFiles(directory="frontend/dist/static"), name="static")

# @app.get("/{full_path:path}")
# async def catch_all(full_path: str):
#     """Serve Vue's index.html for all frontend routes."""
#     return FileResponse("frontend/dist/index.html")