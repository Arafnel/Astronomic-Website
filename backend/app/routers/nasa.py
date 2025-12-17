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
        
        # Упрощаем данные
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
    """Получить астрономические объекты (статичные данные)"""
    return [
        # Галактики
        {"id": "m31", "name": "Галактика Андромеды (M31)", "type": "galaxy", "distance_ly": 2537000, "magnitude": 3.4, "constellation_id": 1},
        {"id": "m33", "name": "Галактика Треугольника (M33)", "type": "galaxy", "distance_ly": 3000000, "magnitude": 5.7, "constellation_id": 2},
        {"id": "m81", "name": "Галактика Боде (M81)", "type": "galaxy", "distance_ly": 12000000, "magnitude": 6.9, "constellation_id": 3},
        {"id": "m87", "name": "Галактика Девы (M87)", "type": "galaxy", "distance_ly": 53000000, "magnitude": 8.6, "constellation_id": 4},
        {"id": "ngc4594", "name": "Галактика Сомбреро (M104)", "type": "galaxy", "distance_ly": 29000000, "magnitude": 8.0, "constellation_id": 4},
        
        # Туманности
        {"id": "m42", "name": "Туманность Ориона (M42)", "type": "nebula", "distance_ly": 1344, "magnitude": 4.0, "constellation_id": 5},
        {"id": "m57", "name": "Кольцевая туманность (M57)", "type": "nebula", "distance_ly": 2300, "magnitude": 8.8, "constellation_id": 6},
        {"id": "m1", "name": "Крабовидная туманность (M1)", "type": "nebula", "distance_ly": 6500, "magnitude": 8.4, "constellation_id": 7},
        {"id": "ngc7000", "name": "Туманность Северная Америка", "type": "nebula", "distance_ly": 2590, "magnitude": 4.0, "constellation_id": 8},
        {"id": "m16", "name": "Туманность Орел (M16)", "type": "nebula", "distance_ly": 7000, "magnitude": 6.0, "constellation_id": 9},
        
        # Звезды
        {"id": "sirius", "name": "Сириус (Альфа Большого Пса)", "type": "star", "distance_ly": 8.6, "magnitude": -1.46, "constellation_id": 10},
        {"id": "canopus", "name": "Канопус (Альфа Киля)", "type": "star", "distance_ly": 310, "magnitude": -0.74, "constellation_id": 11},
        {"id": "rigel", "name": "Ригель (Бета Ориона)", "type": "star", "distance_ly": 860, "magnitude": 0.13, "constellation_id": 5},
        {"id": "vega", "name": "Вега (Альфа Лиры)", "type": "star", "distance_ly": 25, "magnitude": 0.03, "constellation_id": 6},
        {"id": "betelgeuse", "name": "Бетельгейзе (Альфа Ориона)", "type": "star", "distance_ly": 640, "magnitude": 0.50, "constellation_id": 5},
        {"id": "polaris", "name": "Полярная звезда (Альфа Малой Медведицы)", "type": "star", "distance_ly": 433, "magnitude": 1.98, "constellation_id": 12},
        
        # Черные дыры
        {"id": "sgr_a", "name": "Sagittarius A* (Черная дыра Млечного Пути)", "type": "black_hole", "distance_ly": 26000, "magnitude": 0, "constellation_id": 13},
        {"id": "m87_bh", "name": "M87* (Черная дыра в M87)", "type": "black_hole", "distance_ly": 53000000, "magnitude": 0, "constellation_id": 4},
        {"id": "cygnus_x1", "name": "Cygnus X-1", "type": "black_hole", "distance_ly": 7200, "magnitude": 8.95, "constellation_id": 8},
        
        # Звездные скопления
        {"id": "m45", "name": "Плеяды (M45)", "type": "star_cluster", "distance_ly": 444, "magnitude": 1.6, "constellation_id": 7},
        {"id": "m13", "name": "Геркулес (M13)", "type": "star_cluster", "distance_ly": 25100, "magnitude": 5.8, "constellation_id": 14},
        {"id": "m22", "name": "M22 (Стрелец)", "type": "star_cluster", "distance_ly": 10400, "magnitude": 5.1, "constellation_id": 13},
        
        # Планеты и спутники
        {"id": "jupiter", "name": "Юпитер", "type": "planet", "distance_ly": 0.000083, "magnitude": -2.94, "constellation_id": None},
        {"id": "saturn", "name": "Сатурн", "type": "planet", "distance_ly": 0.000151, "magnitude": 0.46, "constellation_id": None},
        {"id": "mars", "name": "Марс", "type": "planet", "distance_ly": 0.000024, "magnitude": -2.6, "constellation_id": None},
        {"id": "venus", "name": "Венера", "type": "planet", "distance_ly": 0.000004, "magnitude": -4.6, "constellation_id": None},
        
        # Кометы
        {"id": "halley", "name": "Комета Галлея", "type": "comet", "distance_ly": 0.000006, "magnitude": 28.2, "constellation_id": None},
        {"id": "hale_bopp", "name": "Комета Хейла-Боппа", "type": "comet", "distance_ly": 0.000014, "magnitude": -1.8, "constellation_id": None},
        
        # Пульсары
        {"id": "psr_b1919", "name": "PSR B1919+21 (Первый пульсар)", "type": "pulsar", "distance_ly": 2283, "magnitude": 0, "constellation_id": 15},
        {"id": "crab_pulsar", "name": "Пульсар в Крабовидной туманности", "type": "pulsar", "distance_ly": 6500, "magnitude": 16.5, "constellation_id": 7},
        
        # Экзопланеты
        {"id": "proxima_b", "name": "Proxima Centauri b", "type": "exoplanet", "distance_ly": 4.24, "magnitude": 0, "constellation_id": 16},
        {"id": "kepler_452b", "name": "Kepler-452b (Земля 2.0)", "type": "exoplanet", "distance_ly": 1402, "magnitude": 0, "constellation_id": 8},
        {"id": "trappist_1e", "name": "TRAPPIST-1e", "type": "exoplanet", "distance_ly": 40, "magnitude": 0, "constellation_id": 17}
    ]

@router.post("/objects/{nasa_id}/favorite")
def add_nasa_object_to_favorites(nasa_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Добавить NASA объект в избранное"""
    # Проверяем, есть ли уже этот объект в БД
    obj = db.query(AstronomicObject).filter(AstronomicObject.name.contains(nasa_id)).first()
    
    if not obj:
        # Получаем данные из NASA API
        try:
            response = requests.get(
                f"{NASA_BASE_URL}/neo/rest/v1/neo/{nasa_id}",
                params={"api_key": NASA_API_KEY},
                timeout=5
            )
            response.raise_for_status()
            asteroid = response.json()
            
            # Создаем объект в БД
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
    
    # Проверяем, не добавлен ли уже в избранное
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