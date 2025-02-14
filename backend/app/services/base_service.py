from google.cloud import firestore
from typing import Dict, Any, Generic, Optional, Type, TypeVar
from app.logging_config import logger
from app.models.base import BaseModel

T = TypeVar("T", bound=BaseModel)

db = firestore.Client()

class BaseService(Generic[T]):
    # Must be defined in child class
    collection_name: str  
    model: Type[T]  # The Pydantic model type

    @classmethod
    def create(cls, data: T) -> T:
        """Creates a new document in Firestore and returns the created object."""
        if not cls.collection_name or not cls.model:
            raise ValueError("Collection name and model type must be defined.")

        doc_ref = db.collection(cls.collection_name).add(data.model_dump())
        doc_id = doc_ref[1].id
        logger.info(f"Created document {doc_id} in {cls.collection_name}.")

        # Return an instance of the correct type with the new ID
        return cls.model(id=doc_id, **data.model_dump(exclude={'id'}))

    @classmethod
    def get(cls, doc_id: str) -> Optional[T]:
        """Retrieves a document by ID and returns an instance of the model."""
        doc_ref = db.collection(cls.collection_name).document(doc_id)
        doc = doc_ref.get()
        if doc.exists:
            assert doc.id == doc_id, "id field in firestore must match the id provided."
            return cls.model(**doc.to_dict())  # Convert Firestore dict to model
        return None

    @classmethod
    def update(cls, doc_id: str, data: Dict[str, Any]) -> bool:
        """Updates a document in Firestore."""
        doc_ref = db.collection(cls.collection_name).document(doc_id)
        if doc_ref.get().exists:
            doc_ref.update(data)
            logger.info(f"Updated document {doc_id} in {cls.collection_name}.")
            return True
        return False

    @classmethod
    def delete(cls, doc_id: str) -> bool:
        """Deletes a document by ID."""
        doc_ref = db.collection(cls.collection_name).document(doc_id)
        if doc_ref.get().exists:
            doc_ref.delete()
            logger.info(f"Deleted document {doc_id} from {cls.collection_name}.")
            return True
        return False

    @classmethod
    def get_all(cls) -> list[T]:
        """Retrieves all documents from a collection as a list of model instances."""
        docs = db.collection(cls.collection_name).stream()
        return [cls.model(id=doc.id, **doc.to_dict()) for doc in docs]