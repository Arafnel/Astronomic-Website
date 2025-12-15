from pydantic import BaseModel
from datetime import datetime
from .astronomic_object import ObjectResponse

class FavoriteResponse(BaseModel):
    id: int
    user_id: int
    object_id: int
    created_at: datetime
    astronomic_object: ObjectResponse
    
    class Config:
        from_attributes = True