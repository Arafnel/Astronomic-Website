from pydantic import BaseModel
from typing import Optional

class ConstellationResponse(BaseModel):
    id: int
    name: str
    short_description: Optional[str] = None
    
    class Config:
        from_attributes = True