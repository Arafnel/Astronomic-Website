from pydantic import BaseModel
from typing import Optional
from .constellation import ConstellationResponse

class ObjectCreate(BaseModel):
    name: str
    type: str
    short_description: Optional[str] = None
    description: Optional[str] = None
    distance_ly: Optional[float] = None
    magnitude: Optional[float] = None
    constellation_id: Optional[int] = None
    image_url: Optional[str] = None

class ObjectUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    distance_ly: Optional[float] = None
    magnitude: Optional[float] = None
    constellation_id: Optional[int] = None
    image_url: Optional[str] = None

class ObjectResponse(BaseModel):
    id: int
    name: str
    type: str
    short_description: Optional[str] = None
    description: Optional[str] = None
    distance_ly: Optional[float] = None
    magnitude: Optional[float] = None
    constellation_id: Optional[int] = None
    image_url: Optional[str] = None
    constellation: Optional[ConstellationResponse] = None
    
    model_config = {"from_attributes": True}