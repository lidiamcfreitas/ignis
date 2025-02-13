from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class BaseSchema(BaseModel):
    id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    def update_timestamp(self):
        self.updated_at = datetime.utcnow()