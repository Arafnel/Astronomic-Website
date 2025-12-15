from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.constellation import Constellation
from ..schemas.constellation import ConstellationResponse

router = APIRouter(prefix="/constellations", tags=["constellations"])

@router.get("/", response_model=List[ConstellationResponse])
def get_constellations(db: Session = Depends(get_db)):
    return db.query(Constellation).all()

@router.get("/{constellation_id}", response_model=ConstellationResponse)
def get_constellation(constellation_id: int, db: Session = Depends(get_db)):
    constellation = db.query(Constellation).filter(Constellation.id == constellation_id).first()
    if not constellation:
        raise HTTPException(status_code=404, detail="Constellation not found")
    return constellation