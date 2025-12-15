from fastapi import APIRouter, HTTPException
import requests
from datetime import datetime

router = APIRouter(prefix="/nasa", tags=["nasa"])

NASA_API_KEY = "DEMO_KEY"  # Используем демо ключ
NASA_BASE_URL = "https://api.nasa.gov"

@router.get("/apod")
def get_astronomy_picture_of_day():
    """Получить астрономическую картинку дня от NASA"""
    try:
        response = requests.get(
            f"{NASA_BASE_URL}/planetary/apod",
            params={"api_key": NASA_API_KEY}
        )
        response.raise_for_status()
        return response.json()
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
            }
        )
        response.raise_for_status()
        data = response.json()
        
        # Упрощаем данные
        objects = []
        for date, asteroids in data.get("near_earth_objects", {}).items():
            for asteroid in asteroids[:5]:  # Берем первые 5
                objects.append({
                    "name": asteroid["name"],
                    "diameter_km": asteroid["estimated_diameter"]["kilometers"]["estimated_diameter_max"],
                    "is_potentially_hazardous": asteroid["is_potentially_hazardous_asteroid"],
                    "close_approach_date": asteroid["close_approach_data"][0]["close_approach_date"]
                })
        
        return {"objects": objects}
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"NASA API error: {str(e)}")

@router.get("/mars-weather")
def get_mars_weather():
    """Получить данные о погоде на Марсе"""
    try:
        response = requests.get(
            f"{NASA_BASE_URL}/insight_weather/",
            params={"api_key": NASA_API_KEY, "feedtype": "json", "ver": "1.0"}
        )
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        # Если API недоступен, возвращаем моковые данные
        return {
            "message": "Mars weather data temporarily unavailable",
            "mock_data": {
                "sol": 3000,
                "temperature": {"average": -60, "min": -80, "max": -40},
                "pressure": 850,
                "wind_speed": 15
            }
        }