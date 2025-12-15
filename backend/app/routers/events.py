from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.event import Event
from ..models.user import User
from ..schemas.event import EventCreate, EventResponse, EventUpdate
from ..services.auth import get_current_user, get_admin_user

router = APIRouter(prefix="/events", tags=["events"])

@router.get("/", response_model=List[EventResponse])
def get_events(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    month: Optional[int] = Query(None, ge=1, le=12),
    year: Optional[int] = None,
    type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Event)
    
    if month is not None:
        query = query.filter(Event.date.extract('month') == month)
    if year is not None:
        query = query.filter(Event.date.extract('year') == year)
    if type:
        query = query.filter(Event.type == type)
    
    return query.offset(skip).limit(limit).all()

@router.get("/{event_id}", response_model=EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.post("/", response_model=EventResponse)
def create_event(
    event: EventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    db_event = Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.put("/{event_id}", response_model=EventResponse)
def update_event(
    event_id: int,
    event_update: EventUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    update_data = event_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_event, field, value)
    
    db.commit()
    db.refresh(db_event)
    return db_event

@router.delete("/{event_id}")
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    db.delete(db_event)
    db.commit()
    return {"message": "Event deleted successfully"}