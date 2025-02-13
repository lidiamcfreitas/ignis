from pydantic import EmailStr
from app.models.base import BaseSchema

class User(BaseSchema):
    email: EmailStr
    password: str

