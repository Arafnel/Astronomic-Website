from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_
from ..database import get_db
from ..models.astronomic_object import AstronomicObject
from ..models.user import User
from ..schemas.astronomic_object import ObjectCreate, ObjectResponse, ObjectUpdate
from ..services.auth import get_current_user, get_admin_user

router = APIRouter(prefix="/objects", tags=["objects"])

@router.get("/", response_model=List[ObjectResponse])
def get_objects(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    type: Optional[str] = None,
    constellation: Optional[str] = None,
    distance_min: Optional[float] = None,
    distance_max: Optional[float] = None,
    magnitude_min: Optional[float] = None,
    magnitude_max: Optional[float] = None,
    db: Session = Depends(get_db)
):
    query = db.query(AstronomicObject)
    
    if type:
        query = query.filter(AstronomicObject.type == type)
    if distance_min is not None:
        query = query.filter(AstronomicObject.distance_ly >= distance_min)
    if distance_max is not None:
        query = query.filter(AstronomicObject.distance_ly <= distance_max)
    if magnitude_min is not None:
        query = query.filter(AstronomicObject.magnitude >= magnitude_min)
    if magnitude_max is not None:
        query = query.filter(AstronomicObject.magnitude <= magnitude_max)
    
    return query.offset(skip).limit(limit).all()

@router.get("/{object_id}", response_model=ObjectResponse)
def get_object(object_id: int, db: Session = Depends(get_db)):
    obj = db.query(AstronomicObject).filter(AstronomicObject.id == object_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Object not found")
    return obj

@router.post("/", response_model=ObjectResponse)
def create_object(
    obj: ObjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    db_obj = AstronomicObject(**obj.model_dump())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.put("/{object_id}", response_model=ObjectResponse)
def update_object(
    object_id: int,
    obj_update: ObjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    db_obj = db.query(AstronomicObject).filter(AstronomicObject.id == object_id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Object not found")
    
    update_data = obj_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
    
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.delete("/{object_id}")
def delete_object(
    object_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    db_obj = db.query(AstronomicObject).filter(AstronomicObject.id == object_id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Object not found")
    
    db.delete(db_obj)
    db.commit()
    return {"message": "Object deleted successfully"}