import logging
import sys
from dotenv import load_dotenv
import os
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

# Load environment variables
load_dotenv()

# Get logging level from .env, default to INFO if not set
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
APP_NAME = os.getenv("APP_NAME", "app-name")
LOG_FILE = os.getenv("LOG_FILE")

# Validate and set logging level
LEVELS = {"DEBUG": logging.DEBUG, "INFO": logging.INFO, "WARNING": logging.WARNING, "ERROR": logging.ERROR, "CRITICAL": logging.CRITICAL}
log_level = LEVELS.get(LOG_LEVEL, logging.INFO)

# Define log format
LOG_FORMAT = "%(asctime)s - %(levelname)s - %(name)s - %(message)s"

# Create a logger
logger = logging.getLogger(APP_NAME.lower())
logger.setLevel(logging.DEBUG)

# Log the current logging level
logger.info(f"Logging initialized at {LOG_LEVEL} level")

# Console handler
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.DEBUG)
console_handler.setFormatter(logging.Formatter(LOG_FORMAT))

logger.addHandler(console_handler)
if LOG_FILE:
    logger.info(f"Logging to file: {LOG_FILE}")
    # File handler (store logs in a file)
    file_handler = logging.FileHandler(LOG_FILE)
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(logging.Formatter(LOG_FORMAT))
    logger.addHandler(file_handler)

class LogRequestsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.info(f"Received request: {request.method} {request.url}")
        response = await call_next(request)
        logger.info(f"Response: {response.status_code}")
        return response