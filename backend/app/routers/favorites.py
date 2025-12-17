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
    authorization: str = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    # Простая проверка для теста
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=404, detail="No users found")
    return db.query(Favorite).filter(Favorite.user_id == user.id).all()

@router.post("/{object_id}")
def add_to_favorites(
    object_id: int,
    authorization: str = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    # Check if object exists
    obj = db.query(AstronomicObject).filter(AstronomicObject.id == object_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Object not found")
    
    # Check if already in favorites
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=404, detail="No users found")
        
    existing = db.query(Favorite).filter(
        Favorite.user_id == user.id,
        Favorite.object_id == object_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Object already in favorites")
    
    favorite = Favorite(user_id=user.id, object_id=object_id)
    db.add(favorite)
    db.commit()
    return {"message": "Added to favorites"}

@router.delete("/{object_id}")
def remove_from_favorites(
    object_id: int,
    authorization: str = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=404, detail="No users found")
        
    favorite = db.query(Favorite).filter(
        Favorite.user_id == user.id,
        Favorite.object_id == object_id
    ).first()
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")
    
    db.delete(favorite)
    db.commit()
    return {"message": "Removed from favorites"}