# Initialize firebase
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth, firestore, initialize_app

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