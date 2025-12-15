from pydantic import BaseModel
from datetime import date
from typing import Optional

class EventCreate(BaseModel):
    title: str
    date: date
    type: str
    description: Optional[str] = None
    visibility: Optional[str] = None

class EventUpdate(BaseModel):
    title: Optional[str] = None
    date: Optional[date] = None
    type: Optional[str] = None
    description: Optional[str] = None
    visibility: Optional[str] = None

class EventResponse(BaseModel):
    id: int
    title: str
    date: date
    type: str
    description: Optional[str] = None
    visibility: Optional[str] = None
    
    model_config = {"from_attributes": True}