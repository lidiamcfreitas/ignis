from firebase_admin import auth
from google.cloud import firestore
from app.models.user import User
from app.logging_config import logger
from app.services.base_service import BaseService

db = firestore.Client()

class UserService(BaseService):
    collection_name = "users"
    model = User

    @classmethod
    def create(cls, data: User) -> User:
        """Creates a new user in Firestore and returns the created object."""
        logger.debug("UserService: verify that id is provided.")
        assert data.id, "User ID (uid, field 'id') must be provided."

        logger.debug("Creating or getting doc with ID")
        user_ref = db.collection(cls.collection_name).document(data.id)
        user_doc = user_ref.get()

        logger.debug("UserService: check if user already exists.")
        if user_doc.exists:
            logger.info(f"Did not create user, because it already exists. ID: {user_doc.id}")
            return User(**user_doc.to_dict())  # ✅ Return existing user

        # Create a new user record
        logger.debug(f"UserService: create new user with id {user_doc.id}.")
        user_ref.set(data.model_dump())
        return data