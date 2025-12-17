from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.favorite import Favorite
from ..models.astronomic_object import AstronomicObject
from ..models.user import User
from ..schemas.favorite import FavoriteResponse
from ..services.auth import get_current_user

router = APIRouter(prefix="/favorites", tags=["favorites"])

@router.get("/", response_model=List[FavoriteResponse])
def get_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Favorite).filter(Favorite.user_id == current_user.id).all()

@router.post("/{object_id}")
def add_to_favorites(
    object_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    obj = db.query(AstronomicObject).filter(AstronomicObject.id == object_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Object not found")
        
    existing = db.query(Favorite).filter(
        Favorite.user_id == current_user.id,
        Favorite.object_id == object_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Object already in favorites")
    
    favorite = Favorite(user_id=current_user.id, object_id=object_id)
    db.add(favorite)
    db.commit()
    return {"message": "Added to favorites"}

@router.delete("/{object_id}")
def remove_from_favorites(
    object_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    favorite = db.query(Favorite).filter(
        Favorite.user_id == current_user.id,
        Favorite.object_id == object_id
    ).first()
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")
    
    db.delete(favorite)
    db.commit()
    return {"message": "Removed from favorites"}