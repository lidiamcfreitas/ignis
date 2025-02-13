from firebase_admin import auth
from google.cloud import firestore
from app.models.user import User
from app.logging_config import logger
from app.services.base_service import BaseService

db = firestore.Client()

class UserService(BaseService):
    collection_name = "users"
    model = User