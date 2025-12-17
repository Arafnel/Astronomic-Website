from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import requests
from datetime import datetime
from ..database import get_db
from ..models.astronomic_object import AstronomicObject
from ..models.user import User
from ..models.favorite import Favorite
from ..services.auth import get_current_user
import asyncio
from concurrent.futures import ThreadPoolExecutor

router = APIRouter(prefix="/nasa", tags=["nasa"])

NASA_API_KEY = "WiCBnnVf0ZFAXbVQQdjiSc0LC4cqcIhffPV1aVmy"
NASA_BASE_URL = "https://api.nasa.gov"

@router.get("/apod")
def get_astronomy_picture_of_day():
    """Получить астрономическую картинку дня от NASA"""
    try:
        response = requests.get(
            f"{NASA_BASE_URL}/planetary/apod",
            params={"api_key": NASA_API_KEY},
            timeout=5
        )
        response.raise_for_status()
        return response.json()
    except requests.Timeout:
        raise HTTPException(status_code=504, detail="NASA API timeout")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"NASA API error: {str(e)}")

@router.get("/neo")
def get_near_earth_objects():
    """Получить список астероидов, приближающихся к Земле"""
    try:
        today = datetime.now().strftime("%Y-%m-%d")
        response = requests.get(
            f"{NASA_BASE_URL}/neo/rest/v1/feed",
            params={
                "start_date": today,
                "end_date": today,
                "api_key": NASA_API_KEY
            },
            timeout=5
        )
        response.raise_for_status()
        data = response.json()
        
        
        objects = []
        for date, asteroids in data.get("near_earth_objects", {}).items():
            for asteroid in asteroids[:5]:
                objects.append({
                    "name": asteroid["name"],
                    "diameter_km": asteroid["estimated_diameter"]["kilometers"]["estimated_diameter_max"],
                    "is_potentially_hazardous": asteroid["is_potentially_hazardous_asteroid"],
                    "close_approach_date": asteroid["close_approach_data"][0]["close_approach_date"]
                })
        
        return {"objects": objects}
    except requests.Timeout:
        return {"objects": [], "message": "NASA API timeout, showing cached data"}
    except requests.RequestException as e:
        return {"objects": [], "message": f"NASA API unavailable: {str(e)}"}

@router.get("/mars-weather")
def get_mars_weather():
    """Получить данные о погоде на Марсе"""
    try:
        response = requests.get(
            f"{NASA_BASE_URL}/insight_weather/",
            params={"api_key": NASA_API_KEY, "feedtype": "json", "ver": "1.0"},
            timeout=3
        )
        response.raise_for_status()
        return response.json()
    except:
        return {
            "message": "Mars weather data temporarily unavailable",
            "mock_data": {
                "sol": 3000,
                "temperature": {"average": -60, "min": -80, "max": -40},
                "pressure": 850,
                "wind_speed": 15
            }
        }

@router.get("/objects")
def get_nasa_objects():
    """Deprecated: static demo objects were removed to avoid duplicate data.
    Use the database-backed `/objects/` endpoints instead.
    """
    raise HTTPException(status_code=404, detail="Not available")

@router.post("/objects/{nasa_id}/favorite")
def add_nasa_object_to_favorites(nasa_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Добавить NASA объект в избранное"""
    
    obj = db.query(AstronomicObject).filter(AstronomicObject.name.contains(nasa_id)).first()
    
    if not obj:
        
        try:
            response = requests.get(
                f"{NASA_BASE_URL}/neo/rest/v1/neo/{nasa_id}",
                params={"api_key": NASA_API_KEY},
                timeout=5
            )
            response.raise_for_status()
            asteroid = response.json()
            
            
            obj = AstronomicObject(
                name=asteroid["name"],
                type="asteroid",
                distance_ly=0.0,
                magnitude=asteroid.get("absolute_magnitude_h", 0),
                constellation_id=None
            )
            db.add(obj)
            db.commit()
            db.refresh(obj)
        except:
            raise HTTPException(status_code=404, detail="NASA object not found")
    
    
    existing = db.query(Favorite).filter(
        Favorite.user_id == current_user.id,
        Favorite.object_id == obj.id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Already in favorites")
    
    favorite = Favorite(user_id=current_user.id, object_id=obj.id)
    db.add(favorite)
    db.commit()
    
    return {"message": "Added to favorites", "object_id": obj.id}

@router.delete("/objects/{nasa_id}/favorite")
def remove_nasa_object_from_favorites(nasa_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Удалить NASA объект из избранного"""
    obj = db.query(AstronomicObject).filter(AstronomicObject.name.contains(nasa_id)).first()
    
    if not obj:
        raise HTTPException(status_code=404, detail="Object not found")
    
    favorite = db.query(Favorite).filter(
        Favorite.user_id == current_user.id,
        Favorite.object_id == obj.id
    ).first()
    
    if not favorite:
        raise HTTPException(status_code=404, detail="Not in favorites")
    
    db.delete(favorite)
    db.commit()
    
    return {"message": "Removed from favorites"}