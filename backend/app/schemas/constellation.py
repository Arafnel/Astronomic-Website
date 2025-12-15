from pydantic import BaseModel
from typing import Optional

class ConstellationResponse(BaseModel):
    id: int
    name: str
    short_description: Optional[str] = None
    
    model_config = {"from_attributes": True}