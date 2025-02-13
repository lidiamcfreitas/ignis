import logging
import sys
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get logging level from .env, default to INFO if not set
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
APP_NAME = os.getenv("APP_NAME", "app-name")

# Validate and set logging level
LEVELS = {"DEBUG": logging.DEBUG, "INFO": logging.INFO, "WARNING": logging.WARNING, "ERROR": logging.ERROR, "CRITICAL": logging.CRITICAL}
log_level = LEVELS.get(LOG_LEVEL, logging.INFO)

# Define log format
LOG_FORMAT = "%(asctime)s - %(levelname)s - %(name)s - %(message)s"

# Create a logger
logger = logging.getLogger(APP_NAME.lower())
logger.setLevel(logging.DEBUG)

# Console handler
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.DEBUG)
console_handler.setFormatter(logging.Formatter(LOG_FORMAT))

# File handler (store logs in a file)
file_handler = logging.FileHandler("logs/app.log")
file_handler.setLevel(logging.INFO)
file_handler.setFormatter(logging.Formatter(LOG_FORMAT))

# Add handlers to logger
logger.addHandler(console_handler)
logger.addHandler(file_handler)

# Log the current logging level
logger.info(f"Logging initialized at {LOG_LEVEL} level")
